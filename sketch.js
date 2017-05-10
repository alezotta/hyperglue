var locationData;

function preload(){
    locationData =  getCurrentPosition();
}

function setup() {
    print(locationData.latitude)
    print(locationData.longitude)
    print(locationData.accuracy)
    print(locationData.altitude)
    print(locationData.altitudeAccuracy)
    print(locationData.heading)
    print(locationData.speed)
}


function draw() {

}