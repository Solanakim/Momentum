const weather = document.querySelector('.js-weather');
const API_KEY = "4e0161103d778a3c2f856c0378ca0e73";
const COORDS = 'coords';

function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric
        `
        ).then(function(response){
            return response.json();
        }).then(function(json){
            const temparature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temparature} @ ${place}`
        });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsobj = {
        latitude,
        longitude
    };
    saveCoords(coordsobj);
    getWeatehr(latitude, longitude);

}

function handleGeoError(){
    console.log("Can't access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }
    else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();

}

init();