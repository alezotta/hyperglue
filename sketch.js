var locationData;
var myMessage = "Hyperglue testing environment";
var myColor;
var distance = new Array();
//var latList = new Array(45.50416667,45.50388889,45.50388889,45.50388889,45.50361111,45.50361111,45.50305556,45.50305556,45.50305556,45.50305556);
//var lonList = new Array(9.16583333,9.16555556,9.16611111,9.16527778,9.16527778,9.16444444,9.16138889,9.16166667,9.16194444,9.16222222);
var myLat;
var myLon;
var i = 0;
var accuracy = 0;
var stickerJSON = './assets/stickerJSON.json';
var stickerData = new Array();

var mySong;
var mySound;
var analyzer;

var myVolume = 0;

var stickerAmount;

/*= [
  {
    name : 'giovanni',
    track: './assets/track-di-giovanni.mp3',
    stickerImage: './assets/eccetera.jpg',
    latitude: 45,
    longitude: 9
  },
  {
    name : 'giovanni',
    track: './assets/track-di-giovanni.mp3',
    stickerImage: '.assets/eccetera',
    latitude: 45,
    longitude: 9
  },{
    name : 'giovanni',
    track: './assets/track-di-giovanni.mp3',
    stickerImage: '.assets/eccetera',
    latitude: 45,
    longitude: 9
  }
]*/




function preload(){
    //import initial location data
    locationData = getCurrentPosition();
    
    //import all data
    stickerData = loadJSON(stickerJSON);
    
    console.log(stickerData);
    
    //import music track 1
    mySound = loadSound('./assets/tracks/Polarbeers.mp3');
    
    //import music track 1
    //mySound = loadSound(stickerData[1].track);
    
    //import tracks
    /*for(var indexTrack = 0; indexTrack<stickerAmount; indexTrack++){
      //load all tracks 
      mySound = loadSound(stickerData[indexTrack].track);
    }*/
    
    //mySound = loadSound(stickerData[1].track);
    
}

function setup() {
  createCanvas(400,600);
  
  //measures the number of stickers in the array
    stickerAmount = Object.keys(stickerData).length;
    
  
  
  //play all tracks
    /*for(var indexPlay = 0; indexPlay<stickerAmount; indexPlay++){
      mySound[indexPlay].play();
    }*/
    
    myVolume = 0.05;
    
    mySound.play();

  //magic code for sound
  /*analyzer=new p5.Amplitude();
  analyzer.setInput(mySound);*/
  
  //available properties of location data
   /* print(locationData.latitude);
    print(locationData.longitude);
    print(locationData.accuracy);
    print(locationData.heading);
    print(locationData.speed); */
    
    //set initial location data
    myLat = locationData.latitude;
    myLon = locationData.longitude;
    accuracy = locationData.accuracy;
  
  //update my location data every 5 seconds
  intervalCurrentPosition(positionPing, 5000);
}

function positionPing(position){
    //show in console these location properties
    /*print("lat: " + position.latitude);
    print("long: " + position.longitude);
    print("accuracy: " + position.accuracy);*/
    
    //for each array object, get these properties
    //stickersData[2].latitude
    
    i++;
    
    myLat = position.latitude;
    myLon = position.longitude;
    accuracy = position.accuracy;
  
    console.log("Latitude of Sticker 1" + ": " + stickerData[0].lat);
    console.log("Dimensione dell'array POSITIONPING: " + stickerAmount);
  
    for(var index=0; index<stickerAmount; index++) {
    
      //calcola distanza tra due punti, restituisce valore distanza
      distance[index] = calcGeoDistance(stickerData[index].lat, stickerData[index].lon, myLat, myLon, 'km');
    	
    	//check the calculation of distances of my current position from all locations
    	console.log("Latitude of Sticker " + index + ": " + stickerData[index].lat);
    	console.log("Longitude of Sticker " + index + ": " + stickerData[index].lon);
      console.log("Distance from sticker " + index + ": " + distance[index] + " km");
      
      if(min(distance)<0.02){
        //set volume of track[index] based on distance
        myVolume = 1-(min(distance)*50);
      }else{
        //imposta volume al minimo
        myVolume = 0.05;
      }
    }
}


function draw() {
 
 
  mySound.setVolume(myVolume);
  
  /*console.log("Il volume " + stickerData[0].name + " è : " + stickerData[0].myVolume);
  console.log("Il volume " + stickerData[1].name + " è : " + stickerData[1].myVolume);
  console.log("Il volume " + stickerData[2].name + " è : " + stickerData[2].myVolume);*/
  
  colorMode(HSB);

  //azzurro #4e33fd
  //rosso #fe3031
  
  var closestDistance = min(distance);
  
  myColor= lerpColor(color("#fe3031"),color("#4e33fd"),closestDistance*50);
  
  background(myColor);
  
  noStroke();
  fill(255);
  textSize(16);
  text(myMessage,10,60);
  text("Distance from closest sticker: " + floor(closestDistance*1000) + " metri", 10, 120);
  text("My latitude: " + myLat, 10, 160);
  text("My longitude: " + myLon, 10, 180);
  
  text("Refresh: " + i, 10, 200);
  
  text("Volume: " + myVolume, 10, 220);
  
  push();
  fill("#fe3031");
  rect(0,250,70,50);
  fill(lerpColor(color("#fe3031"),color("#4e33fd"),0.5))
  rect(170,250,70,50);
  fill("#4e33fd");
  rect(330,250,70,50);
  pop();
  
  push();
  fill(255);
  ellipse(200,450,accuracy*2,accuracy*2);
  pop();
  
  push();
  fill(0);
  textAlign(CENTER);
  text(accuracy,200,455);
  pop();
  
  text("0 m", 20, 280);
  text("10 m", 180, 280);
  text("20 m", 350, 280);
}

