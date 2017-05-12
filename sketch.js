var locationData;
var myMessage = "Hyperglue testing environment";
var myColor;
var distance = new Array();
var myLat;
var myLon;
var i = 0;
var accuracy = 0;
var stickerJSON = './assets/stickerJSON.json';
var stickerData = new Array();

//tracks
var belizeSong;
var polarbeerSong;
var coralSong;
var patmSong;
var ndgroundSong;
var emptySong;

//volumes
var belizeVolume;
var polarbeersVolume;
var coralVolume;
var patmVolume;
var ndgroundVolume;
var emptyVolume;

//stickers image
var belizeSticker;
var polarbeersSticker;
var coralSticker;
var patmSticker;
var ndgroundSticker;
var emptySticker;

//stickers position
var posEmpty = 200;
var posBelize = -200;
var posPolarbeers = -200;
var posCoral = -200;
var posPatm = -200;
var posNdground = -200;

var stickerAmount;
var minDistance = 0.02;

function preload(){
    //import initial location data
    locationData = getCurrentPosition();
    
    //import all data
    stickerData = loadJSON(stickerJSON);
    
    console.log(stickerData);
    
    //import music track 1
    polarbeersSong = loadSound('./assets/tracks/polarbeers.mp3');
    belizeSong = loadSound('./assets/tracks/belize.mp3');
    coralSong = loadSound('./assets/tracks/coral.mp3');
    patmSong = loadSound('./assets/tracks/patm.mp3');
    ndgroundSong = loadSound('./assets/tracks/2nd_ground.mp3');
    emptySong = loadSound('./assets/tracks/empty.mp3');
    
    //import all tracks
    /*for(var indexTrack = 0; indexTrack<stickerData.length; indexTrack++){
          //load all tracks 
          mySound = loadSound(stickerData[indexTrack].track);
    }*/
    
    //mySound = loadSound(stickerData[1].track);
    
    //import sticker images
    polarbeersSticker = loadImage('./assets/stickers/polarbeers.png');
    belizeSticker = loadImage('./assets/stickers/belize.png');
    coralSticker = loadImage('./assets/stickers/coral.png');
    patmSticker = loadImage('./assets/stickers/patm.png');
    ndgroundSticker = loadImage('./assets/stickers/2nd_ground.png');
    emptySticker = loadImage('./assets/stickers/empty.png');
    
}

function setup() {
  createCanvas(400,600);
  
  //measures the number of stickers in the array
    stickerAmount = Object.keys(stickerData).length;
    
  //play all tracks
    /*for(var indexPlay = 0; indexPlay<stickerAmount; indexPlay++){
      mySound[indexPlay].play();
    }*/
    
    belizeVolume = 0.05;
    polarbeersVolume = 0.05;
    coralVolume = 0.05;
    patmVolume = 0.05;
    ndgroundVolume = 0.05;
    emptyVolume = 0.05;
    
    belizeSong.play();
    polarbeersSong.play();
    coralSong.play();
    patmSong.play();
    ndgroundSong.play();
    emptySong.play();
    
   /* belizeSong.loop();
    polarbeersSong.loop();
    coralSong.loop();
    patmSong.loop();
    ndgroundSong.loop();
    emptySong.loop();*/

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
    
    minDistance = 0.02;
    
    //belize 45.50388889, 9.16611111
    //polarbeers 
    
  
    for(var index=0; index<stickerAmount; index++) {
    
      //calcola distanza tra due punti, restituisce valore distanza
      distance[index] = calcGeoDistance(stickerData[index].lat, stickerData[index].lon, stickerData[9].lat, stickerData[9].lon, 'km');
    	
    	//check the calculation of distances of my current position from all locations
    /*	console.log("Latitude of Sticker " + index + ": " + stickerData[index].lat);
    	console.log("Longitude of Sticker " + index + ": " + stickerData[index].lon);
      console.log("Distance from sticker " + index + ": " + distance[index] + " km");*/
      
      if(distance[index]<minDistance){
        minDistance = distance[index];
        stickerName = stickerData[index].name;
        
        if(stickerName == "Belize"){
          belizeVolume = 1-(distance[index]*50);
          posBelize = 220;
          posEmpty = -200;
        } else if(stickerName == "Polarbeers"){
          polarbeersVolume = 1-(distance[index]*50);
          posPolarbeers = 200;
          posEmpty = -200;
        } else if(stickerName == "Coral Mambo"){
          coralVolume = 1-(distance[index]*50);
          posCoral = 200;
          posEmpty = -200;
        } else if(stickerName == "Patm"){
          patmVolume = 1-(distance[index]*50);
          posPatm = 200;
          posEmpty = -200;
        } else if(stickerName == "2nd Ground"){
          ndgroundVolume = 1-(distance[index]*50);
          posNdground = 200;
          posEmpty = -200;
        } else {
          
          emptyVolume = 0.05;
          belizeVolume = 0;
          polarbeersVolume = 0;
          coralVolume = 0;
          posPatm = 0;
          ndgroundVolume = 0;
          
          posEmpty = 200;
          posBelize = -200;
          posPolarbeers = -200;
          posCoral = -200;
          posPatm = -200;
          posNdground = -200;
          
        }
        
      }
      
      
      //check if there is a sticker in the range of 20 m
      /*if(min(distance)<0.02){
        //set volume of track[index] based on distance
        //0.02*50=1
        myVolume = 1-(min(distance)*50);
      }else{
        //imposta volume al minimo
        myVolume = 0.05;
      }*/
    }
}

function draw() {
 
  belizeSong.setVolume(belizeVolume);
  polarbeersSong.setVolume(polarbeersVolume);
  coralSong.setVolume(coralVolume);
  patmSong.setVolume(patmVolume);
  ndgroundSong.setVolume(ndgroundVolume);
  emptySong.setVolume(emptyVolume);

  
  /*console.log("Il volume " + stickerData[0].name + " è : " + stickerData[0].myVolume);
  console.log("Il volume " + stickerData[1].name + " è : " + stickerData[1].myVolume);
  console.log("Il volume " + stickerData[2].name + " è : " + stickerData[2].myVolume);*/
  
  colorMode(HSB);

  //azzurro #4e33fd
  //rosso #fe3031
  
  //var closestDistance = min(distance);
  
  //find color inside given spectrum based on distance of closest sticker
  //0.02*50=1
  //myColor= lerpColor(color("#fe3031"),color("#4e33fd"),closestDistance*50);
  
  //interface
  background("#4e33fd");
  noStroke();
  fill(255);
  
  push();
    textSize(24);
    text(myMessage,10,40);
  pop();
  
  push();
    translate(0,-40);
    textSize(14);
    //text("Distance from closest sticker: " + floor(closestDistance*1000) + " metri", 10, 120);
    text("My latitude: " + myLat, 10, 160);
    text("My longitude: " + myLon, 10, 180);
    
    /*text("Update number " + i, 10, 200);
    
    text("Volume: " + floor(polarbeersVolume)*100 + " %", 10, 220);*/
    
    text("You are listening to", 10, 220);
  
  pop();
  
  /*push();
    translate(0,100);
    
    push();
      translate(0,80);
      fill("#fe3031");
      rect(0,290,70,50);
      fill(lerpColor(color("#fe3031"),color("#4e33fd"),0.5))
      rect(170,290,70,50);
      fill("#4e33fd");
      rect(330,290,70,50);
    pop();
    
    push();
      textSize(14);
      translate(0,80);
      text("Litmus paper",10,280);
      text("0 m", 20, 320);
      text("10 m", 180, 320);
      text("20 m", 350, 320);
    pop();
    
    push();
      translate(0,20);
      fill(255);
      rectMode(CENTER);
      rect(200,450,accuracy,20);
    pop();
    
    push();
      fill(255);
      translate(0,20);
      textAlign(CENTER);
      text("Accuracy of signal",200,430);
      fill('#4e33fd');
      text(accuracy,200,455);
    pop();
  pop();*/
  
imageMode(CENTER);
image(emptySticker,posEmpty,330);  
image(belizeSticker,posBelize,200);
image(polarbeersSticker,posPolarbeers,390);
image(coralSticker,posCoral,300);
image(patmSticker,posPatm,300);
image(ndgroundSticker,posNdground,300);

}