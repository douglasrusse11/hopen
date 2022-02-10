import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import { useState, useEffect } from 'react';

const Map = ({resources, userCoords, route, setSelectedResource}) => {

    const [mapOptions, setMapOptions] = useState(null)

    useEffect(() => {
        if (resources.length === 1) {
            if (!userCoords) {
                setMapOptions({
                    center: resources[0].latlng, 
                    bounds: [resources[0].latlng.map(r => r-0.001), resources[0].latlng.map(r => r+0.001)],
                    style: mapStyle
                })
            } else {
                const center = resources[0].latlng.map((r,i) => (r+userCoords[i])/2);
                const lats = [resources[0].latlng[0], userCoords[0]].sort();
                const lngs = [resources[0].latlng[1], userCoords[1]].sort();
                setMapOptions({
                    center: center,
                    bounds: [[lats[0]-0.001, lngs[0]-0.001], [lats[1]+0.001, lngs[1]+0.001]],
                    style: mapStyle
                })
            }
        } else {
            const center = [resources.reduce((acc, cur) => acc + cur.latlng[0], 0)/resources.length, resources.reduce((acc, cur) => acc + cur.latlng[1], 0)/resources.length];
            const lats = resources.map(r => r.latlng[0]).sort();
            const lngs = resources.map(r => r.latlng[1]).sort();
            setMapOptions({
                center: center,
                bounds: [[lats[0]-0.001, lngs[0]-0.001], [lats[resources.length-1]+0.001, lngs[resources.length-1]+0.001]],
                style: mapStyle
            })
        }

    }, [resources])


    return (
        <>
        { mapOptions && (
        <MapContainer center={mapOptions.center} bounds={mapOptions.bounds} style={mapOptions.style}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            { resources.map(resource => (
                <Marker position={resource.latlng} key={resource.id}>
                    <Popup>
                        {resource.name} <br/>
                        {resource.category} <br/>
                        {resource.address}
                        {resources.length > 1 && <><br/> <span style={{textDecoration: "underline", color: "blue"}} onClick={() => setSelectedResource(resource)}>More info...</span></>}
                    </Popup>
                </Marker>
                )
            )}
            { userCoords && <Marker position={userCoords} />}
            {route && <Polyline positions={route} />}
            <UpdateMap mapOptions={mapOptions} />
        </MapContainer>
        )}
        </>
    );
}

function UpdateMap({ mapOptions }) {
        const map = useMap();
        map.setView(mapOptions.center);
        map.fitBounds(mapOptions.bounds);
        return null;
    }

const mapStyle = {
    width: "67vw",
    height: "100%"
}

export default Map;