
song = "";
Objects = [];
Status = "";

function preload()
{
	song = loadSound("alert.mp3");
}

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("Status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  Status = true;
}

function gotResult(error, results) {
  if(error) {
    console.log(error);
  }
  console.log(results);
  Objects = results;
}


function draw() {
  image(video, 0, 0, 380, 380);
      if(Status != "")
      {     
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("Status").innerHTML = "Status : Object Detected";
 
          fill("#800000");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke("#800000");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
         
          if(objects[i].label == "person")
          {
            document.getElementById("Number_Of_Objects").innerHTML = "Baby Found :)";
            console.log("stop");
            song.stop();
          }
          else
          {
            document.getElementById("Number_Of_Objects").innerHTML = "Baby Not Found :(";
            console.log("play"); 
            song.play();
          }
         }

        if(objects.length == 0)
        {
          document.getElementById("Number_Of_Objects").innerHTML = "Baby Not Found";
          console.log("play"); 
          song.play();
        }
      }
}