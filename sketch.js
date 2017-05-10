var locationData;
var fence;
var message="loading";

function preload(){
    locationData =  getCurrentPosition();
}

function setup() {
  createCanvas(400,600);
  
    print(locationData.latitude)
    print(locationData.longitude)
    print(locationData.accuracy)
    print(locationData.altitude)
    print(locationData.altitudeAccuracy)
    print(locationData.heading)
    print(locationData.speed)
  
    fenceOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
     };
  
fence = new geoFenceCircle(45.50388889, 9.16583333, 0.01, insideTheFence, outsideTheFence, 'mi', fenceOptions);

}


function insideTheFence(position){
    /*text("INlat: " + position.latitude);
    text("INlong: " + position.longitude);*/
    background(0,255,0);
    message="user is inside of the fence";
    
}

function outsideTheFence(position){
    /*text("OUTlat: " + position.latitude);
    text("OUTlong: " + position.longitude);*/
    
    background(255,0,0);
    
    message="user is outside of the fence";
}


function draw() {
  noStroke();
  fill(255);
  textSize(16);
  text(message,10,60);
  
  
}

