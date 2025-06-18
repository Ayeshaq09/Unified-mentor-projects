import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import locationList from '../data/geoJSON';
import locationIconImage from '../images/location.png';
import currentLocationIconImage from '../images/currentLocation.png';

let map;

// initialise the openstreet map
function initMap(){
    if (map) return;

    map = L.map('map').setView([21.7679, 78.8718], 5);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // function to show few locations on map
    geoLocations();

    return map;
}

function geoLocations(){
    locationList.forEach((item) => {
        const imagePath = require(`../images/${item.properties.image}`);
        const [lat, lng] = item.geometry.coordinates;
        L.marker([lat, lng], {icon: locationIcon})
        .addTo(map)
        .bindPopup(`<div><img src=${imagePath} class="location-img"/></div><p class="name">${item.properties.name}</p>
                    <p class="display-name"><strong>Address </strong>${item.properties.address}</p>
                    <p class="description"><strong>Description </strong>${item.properties.description}</p>`);
    });

    // display current use location on map
    navigator.geolocation.watchPosition(success, error);
}

// function to get the coordinate of user's current location
const success = (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    L.marker([lat, lon], {icon: currentLocationIcon})
    .bindPopup(`<p class="name">Your current location</p>`)
    .addTo(map);
}

// function to get the error in getting user's current location
const error = (err) => {
    if (err === 1){
        alert("Please allow geolocation access");
    }
    else{
        alert("Cannot get the current location");
    }
}

// Icon for location points
var locationIcon = L.icon({
    iconUrl: locationIconImage,
    iconSize: [30,30]
});

// Icon for current location
var currentLocationIcon = L.icon({
    iconUrl: currentLocationIconImage,
    iconSize: [30,30]
});

export {L, map, initMap}