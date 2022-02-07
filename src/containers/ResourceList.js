import { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Resource } from '../models';
import { useParams, Link } from 'react-router-dom';
import Map from '../components/Map';
import Form from '../components/Form';
import Nav from '../components/Nav';

const initialState = {
    category: '',
    name: '',
    address: '',
    description: '',
    phoneNumber: '',
    emailAddress: '',
    openingHours: '',
    latlng: [0, 0]
};

const ResourceList = ({user, client}) => {
    const [formData, setFormData] = useState(initialState);
    const [resourceList, setResourceList] = useState([]);
    const [selectedResource, setSelectedResource] = useState({id: 0})
    const [displayAddNew, setDisplayAddNew] = useState(true);
    const [displayUpdateForm, setDisplayUpdateForm] = useState({id: 0, display: false})
    const [userCoords, setUserCoords] = useState(null);
    const [route, setRoute] = useState(null);
    let { category } = useParams();

    useEffect(() => {
        setSelectedResource({id: 0});
        fetchResources();
        const subscription = DataStore.observe(Resource)
                                      .subscribe(() => fetchResources())
        return () => subscription.unsubscribe()
      }, [category]);

    const fetchResources = () => {
        DataStore.query(Resource, r => r.category("eq", category))
            .then(data => setResourceList(data))
    }

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
    
    function success(pos) {
        setUserCoords([pos.coords.latitude, pos.coords.longitude]);
    }
    
    function errors(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.permissions
              .query({ name: "geolocation" })
              .then(function (result) {
                if (result.state === "granted") {
                  navigator.geolocation.getCurrentPosition(success);
                } else if (result.state === "prompt") {
                  navigator.geolocation.getCurrentPosition(success, errors, options);
                } else if (result.state === "denied") {
                }
              });
          }
    }, [])

    useEffect(() => {
        if (selectedResource.id !== 0 && userCoords ) {
            var params = {
                "CalculatorName": "AthensRouteCalculator",
                "DeparturePosition": [userCoords[1], userCoords[0]],
                "DestinationPosition": [selectedResource.latlng[1], selectedResource.latlng[0]],
                "WaypointPositions": [],
                "TravelMode": "Walking",
                "IncludeLegGeometry": true,
                "DistanceUnit": "Kilometers",
                "DepartNow": false
              };
              client.calculateRoute(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                if (data) setRoute(data.Legs[0].Geometry.LineString.map(a => [a[1], a[0]]));           // successful response
              });
        }
    }, [selectedResource, userCoords])

    const updateResource = async (id) => {
        const resource = await DataStore.query(Resource, id);
        await DataStore.save(Resource.copyOf(resource, updated => {
            updated.category = formData.category;
            updated.name = formData.name;
            updated.address = formData.address;
            updated.description = formData.description;
            updated.phoneNumber = formData.phoneNumber;
            updated.emailAddress = formData.emailAddress;
            updated.openingHours = formData.openingHours;
            updated.latlng = formData.latlng;
        }))
        setDisplayUpdateForm(false);
    }

    const deleteResource = async (id) => {
        const resource = await DataStore.query(Resource, id);
        await DataStore.delete(resource);
    }

    const displayResources = () => {
        return resourceList.map(resource => (
            <>
            { displayUpdateForm.id === resource.id && displayUpdateForm.display === true ? 
                <>
                <Form onSubmit={() => updateResource(resource.id)} formData={formData} setFormData={setFormData} />
                <button onClick={() => setDisplayUpdateForm({id: 0, display: false})}>Close</button>
                </>
            : 
            <div key={resource.id} style={styles.resource} >
                <div style={{width: "80%"}} onClick={() => {if (selectedResource.id === resource.id) {setSelectedResource({id: 0})} else {setSelectedResource(resource)}}}>
                    <h3 style={styles.heading}>{resource.name}</h3>
                    <h4 style={styles.heading}>{resource.category}</h4>
                    <h5 style={styles.heading}>{resource.address}</h5>
                    {selectedResource.id === resource.id && (
                        <>
                            <p>Phone Number: {resource.phoneNumber}</p>
                            <p>Email Address: <a href={`mailto:${resource.emailAddress}`}>{resource.emailAddress}</a></p>
                            <p>Opening Hours: {resource.openingHours}</p>
                            <p>{resource.description}</p>
                        </>
                    )}
                </div>
                <div style={{width: "48px"}}>
                { user && user.isAdmin && (
                    <>
                        <span className="material-icons" onClick={() => { setFormData({...resource}); setDisplayAddNew(true); setDisplayUpdateForm({id: resource.id, display: true})}}>edit</span>
                        <span className="material-icons" onClick={() => {deleteResource(resource.id); setSelectedResource({id: 0})}}>delete</span>
                    </>
                )}
                </div>
            </div>
            }
            </>
        ))
    }

    const displayForm = (style) => {
        return (
            <div style={styles.container}>
                {user && user.isAdmin && (displayAddNew ? <button style={styles.button} onClick={() => {setFormData(initialState); setDisplayAddNew(false)}}>+ Add new</button> : <><Form onSubmit={createResource} formData={{...formData, category: category}} setFormData={setFormData} client={client} /><button style={{width: "100%"}} onClick={() => setDisplayAddNew(true)}>Close</button></>)}
            </div>
        )
    }

    const createResource = async () => {
            if (!formData.name) return
            try {
                await DataStore.save(new Resource({ ...formData }));
                setFormData(initialState);
                setDisplayAddNew(true);
            } catch (err) {
                console.log("Create error: ", err);
            }
    }

    return (
        <div style={{display: "flex", flexDirection: "column", width: "100%", height: "100%", backgroundColor: "#29648a", color: "whitesmoke"}}>
            <Nav />
            <div style={{display: "flex", height: "100%", width: "100%"}}>
                {resourceList.length !== 0 && (selectedResource.id === 0 ? <Map resources={resourceList} userCoords={null} route={null} setSelectedResource={setSelectedResource} /> : <Map resources={[selectedResource]} userCoords={userCoords} route={route} setSelectedResource={setSelectedResource} />)}
                <div style={styles.resources} >
                    {(resourceList && resourceList.length !== 0) ? displayResources() : <h3>No resources to display for {category}.</h3>}
                    {displayForm()}
                </div>
            </div>
        </div>
    )
}

const styles = {
    resource: {
        margin: 0,
        marginBottom: 10,
        paddingLeft: 20,
        display: 'flex',
        justifyContent: 'space-between',
        width: "30vw"
    },
    resources: {
        display: "flex",
        flexDirection: "column"
    },
    heading: {
        margin: 0,
        color: 'whitesmoke'
    },
    button: {
        height: 20,
        marginLeft: 20
    }

}

export default ResourceList;