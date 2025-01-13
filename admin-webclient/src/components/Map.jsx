import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayerGroup, Circle, Rectangle } from 'react-leaflet';
import L from 'leaflet';

function Map({ isLoggedIn, handleLogin, handleLogout }) {
    if (!isLoggedIn) {
        return (
            <div className="map">
                <h2>Please log in to view this page.</h2>
            </div>
        );
    }

    const cityCoordinates = [56.18622277149586, 15.624460990841534];
    const scooter = [56.182038081404045, 15.60076601765002];
    const greenCenterCoordinates = [56.172038081404045, 15.60076601765002];
    const redCenterCoordinates = [56.18622277149586, 15.624460990841534];
    const blueCenterCoordinates = [56.20622277149586, 15.624460990841534];
    const rectangle = [[56.18622277149586, 15.624460990841534], [56.20622277149586, 15.724460990841534]];

    const blue = { color: 'blue' }
    const red = { fillColor: 'red' }
    const green = { fillColor: 'green' }

    const scooterIcon = new L.Icon({
        iconUrl: 'scooter.png',
        iconSize: [30, 30],
        iconAnchor: [12, 25],
        popupAnchor: [0, -30]
    });

    return (
        <div className="map">
            <h1>Map</h1>
            <MapContainer center={cityCoordinates} zoom={12}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={scooter} icon={scooterIcon}>
                    <Popup>
                        <h2>Scooter location</h2>
                        <button>delete</button>
                    </Popup>
                </Marker>
                <Circle 
                    center={blueCenterCoordinates} 
                    pathOptions={blue} 
                    radius={1500} />
                <Circle
                    center={redCenterCoordinates}
                    pathOptions={red}
                    radius={700}
                    stroke={false}
                />
                <Circle
                    center={greenCenterCoordinates}
                    pathOptions={green}
                    radius={1000}
                    stroke={false}
                />
                <Rectangle 
                    bounds={rectangle}
                    stroke={false}
                    pathOptions={green}
                />
            </MapContainer>
        </div>
    );
}

export default Map;
