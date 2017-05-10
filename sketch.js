var locationData;
var fence;
var myMessage="Hello";
var myColor;
var distance=new Array();
var latList= new Array(45.50416667,45.50388889,45.50388889,45.50388889,45.50361111,45.50361111,45.50305556,45.50305556,45.50305556,45.50305556);
var lonList= new Array(9.16583333,9.16555556,9.16611111,9.16527778,9.16527778,9.16444444,9.16138889,9.16166667,9.16194444,9.16222222);
var myLat;
var myLon;

function preload(){
    locationData = getCurrentPosition();
}

function setup() {
  createCanvas(400,600);
  
   /* print(locationData.latitude);
    print(locationData.longitude);
    print(locationData.accuracy);
    print(locationData.heading);
    print(locationData.speed);*/
  
  intervalCurrentPosition(positionPing, 5000);
  
  myLat = locationData.latitude;
  myLon = locationData.longitude;
  
  
    for(var index=0; index<latList.length; index++) {
    
      //calcola distanza tra due punti, restituisce valore distanza
      distance[index] = calcGeoDistance(latList[index], lonList[index], myLat, myLon, 'km');
    	
    	console.log("Latitude of Sticker " + index + ": " + latList[index]);
    	console.log("Longitude of Sticker " + index + ": " + lonList[index]);
      console.log("Distance from sticker " + index + ": " + distance[index] + " km")
      
    }
}


function positionPing(position){
    print("lat: " + locationData.latitude);
    print("long: " + locationData.longitude);
}

function draw() {
  
  colorMode(HSB);

  //azzurro #00aad1
  //rosso #ff006e
  
  myColor= lerpColor(color("#00aad1"),color("#ff006e"),min(distance)%0.5/0.5);
  
  background(myColor);
  noStroke();
  fill(255);
  textSize(16);
  /*text(myMessage,10,60);*/
  text("Hello",10,60);
  text("distance from closest sticker: " + min(distance), 10, 120);
  text("my latitude: " + myLat, 10, 160);
  text("my longitude: " + myLon, 10, 180);
  push();
  fill("#00aad1");
  rect(0,250,50,50);
  fill("#ff006e");
  rect(350,250,50,50);
  pop();
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

