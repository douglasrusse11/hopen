import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Resource } from '../models';
import ResourceDetail from '../components/ResourceDetail';
import Map from '../components/Map';
import Form from '../components/Form';
import Nav from '../components/Nav';

const ResourceContainer = ({user, formData, setFormData, client}) => {
    const [resource, setResource] = useState(null);
    const [displayUpdateForm, setDisplayUpdateForm] = useState(false)
    const [userCoords, setUserCoords] = useState(null);
    const [route, setRoute] = useState(null);
     let { id } = useParams();

    useEffect(() => {
        DataStore.query(Resource, id)
            .then(res => setResource(res))
    }, [])

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
        if (resource && userCoords ) {
            var params = {
                "CalculatorName": "AthensRouteCalculator",
                "DeparturePosition": [userCoords[1], userCoords[0]],
                "DestinationPosition": [resource.latlng[1], resource.latlng[0]],
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
    }, [resource, userCoords])

    const updateResource = async (id) => {
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
        await DataStore.query(Resource, id)
            .then(res => setResource(res))
    }

    const deleteResource = async (id) => {
        await DataStore.delete(resource);
    }

    return (
        <>
        { resource && (
            <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                <Nav />
                {resource.latlng && <Map resources={[resource]} userCoords={userCoords} route={route} />}
                { displayUpdateForm ?
                    <Form formData={formData} setFormData={setFormData} onSubmit={() => updateResource(resource.id)} client={client} /> :
                    <ResourceDetail resource={resource} user={user} setFormData={setFormData} setDisplayUpdateForm={setDisplayUpdateForm} deleteResource={deleteResource}  />
                }
            </div>
        )}
        </>
    )

}

export default ResourceContainer;