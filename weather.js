const API_KEY = "c6694281a701668802c9420eaebfe8f9";
const COORDS = 'coords';

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
}

function handelGeoError(){
    console.log('can not Geo Location');
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handelGeoError);
}

function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null){
        askForCoords();
    } else {
        //getWeater
    }
}

function init(){
    loadCoords();
}

init();