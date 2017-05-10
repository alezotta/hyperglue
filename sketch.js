var locationData;
var fence;
var message="Hello";
var myColor="";
var distance=new Array();
var myLat;
var myLon;
var latList=[45.50388889,45.50361111];
var lonList=[9.16555556,9.16444444];
var stickerLat;
var stickerLon;

function preload(){
    locationData = getCurrentPosition();
}

function setup() {
  createCanvas(400,600);
  
    print(locationData.latitude);
    print(locationData.longitude);
    print(locationData.accuracy);
    print(locationData.heading);
    print(locationData.speed);
  
  myLat = locationData.latitude;
  myLon = locationData.longitude;
  
  
   watchOptions = {
     enableHighAccuracy: true,
     timeout: 3000,
     maximumAge: 0
 };
    watchPosition(positionChanged, watchOptions);
  
  
/*      fenceOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
      };
  
fence = new geoFenceCircle(stickerLat[0], stickerLon[0], 0.01, insideTheFence, outsideTheFence, 'km', fenceOptions);
*/

    for(var index=0; index<latList.length; index++) {
      
      /*stickerLat = latList[index];
      stickerLon = lonList[index];*/
      
      
      //calcola distanza tra due punti, restituisce valore distanza
      distance[index] = calcGeoDistance(latList[index], lonList[index], myLat, myLon, 'km');
    	
    	console.log("Latitude of Sticker " + index + ": " + latList[index]);
    	console.log("Longitude of Sticker " + index + ": " + lonList[index]);
      console.log("Distance from sticker " + index + ": " + distance[index] + " km")
      
    }
}

function positionChanged(position){
    print("lat: " + position.latitude);
    print("long: " + position.longitude);
    
    
}

/*function insideTheFence(position){
    myColor="#00FF00";
    message="user is inside of the fence";
}

function outsideTheFence(position){
    myColor="#FF0000";
    message="user is outside of the fence";
}*/


function draw() {
  
  colorMode(HSB);

  //azzurro #00aad1
  //rosso #ff006e
  
  myColor= lerpColor(color("#00aad1"),color("#ff006e"),distance[0]%0.5/0.5);
  
  background(myColor);
  noStroke();
  fill(255);
  textSize(16);
  text(message,10,60);
  text("distance from sticker: " + distance, 10, 120);
  fill("#00aad1");
  rect(100,200,100,100);
  push();
  fill(255);
  ellipse(200,400,locationData.accuracy*3,locationData.accuracy*3);
  pop();
  push();
  fill(0);
  textAlign(CENTER);
  text(locationData.accuracy,200,400);
  pop();
}

