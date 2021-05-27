const weather = document.querySelector(".js-weather");

const API_KEY = "c6694281a701668802c9420eaebfe8f9";
const COORDS = 'coords';

function getWeater(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    )
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        console.log(json);
        //온도의 소수점 버리기 처리
        const temperture = Math.floor(json.main.temp);
        const place = json.name;
        weather.innerText = `${temperture}º @ ${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

//위치좌표를 성공정으로 가져올때 실행되는 함수
function handleGeoSucces(position){
    //console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };
    saveCoords(coordsObj);
    getWeater(latitude,longitude);
}

function handelGeoError(){
    console.log('can not Geo Location');
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handelGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        //console.log(parsedCoords);
        getWeater(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();