Arcade="";
Shayad="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scoreRightWrist = 0;
song_name = "";


function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);

}

function preload(){
    Arcade = loadSound("Arcade.mp3");
    Shayad = loadSound("Shayad.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song_name = Arcade.isPlaying();
    console.log(song_name);

    if(scoreleftWrist > 0.2)
    {
        circle(leftWrist_x,leftWrist_y,20);
        Shayad.stop();
        if(song_name == false){
            Arcade.play();
        }
        else{
            console.log("Song Name: Arcade");
            document.getElementById("song_name").innerHTML = "Song Name: Arcade";
        }
    }
    if(scoreRightWrist > 0.2)
    {
        circle(rightWrist_x,rightWrist_y,20);
        Arcade.stop();
        if(song_name == false){
            Shayad.play();
        }
        else{
            console.log("Song Name: Shayad");
            document.getElementById("song_name").innerHTML = "Song Name: Shayad ";
        }
    }
}


function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);
         
        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}