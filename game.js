var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var highLevel = 0;
var blue = new Audio("sounds/blue.mp3");
var green = new Audio("sounds/green.mp3");
var red = new Audio("sounds/red.mp3");
var wrong = new Audio("sounds/wrong.mp3");
var yellow = new Audio("sounds/yellow.mp3");

function playSound(alpha) {
    switch (alpha) {
        case "blue":
            blue.play();
            // console.log("blue is played");
            break;
        case "green":
            green.play();
            // console.log("green is played");
            break;
        case "red":
            red.play();
            // console.log("red is played");
            break;
        case "wrong":
            wrong.play();
            // console.log("wrong is played");
            break;
        case "yellow":
            yellow.play();
            // console.log("yellow is played");
        default:
            break;
    }
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){$("#"+currentColour).removeClass("pressed");},50);
}

function startOver(){
    started=false;
    gamePattern.splice(0,gamePattern.length);
    highLevel=Math.max(highLevel,level);
    $("p").text("highest level = "+highLevel);
    level = 0;
}

function wrongAns(){
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");}, 200);
    userClickedPattern.splice(0,userClickedPattern.length);
    startOver();
}


function checkAnswer(currentLevel){
    var flag=true;
    // for(var i=0;i<currentLevel;i++){
    //     if(userClickedPattern[i]!=gamePattern[i]){
    //         flag=false;
    //         break;
    //     }
    // }
    if(userClickedPattern[userClickedPattern.length-1]!=gamePattern[userClickedPattern.length-1]){
        flag=false;
    }
    if(flag==false){
        console.log("fail");
        wrongAns();
        
    }
    else{
        console.log("pass");
        if(userClickedPattern.length==level){
            userClickedPattern.splice(0,userClickedPattern.length);
            setTimeout(function(){
                nextSequence();
            }, 1000);
    }
    }
}

var level = 0;
function nextSequence(){
    // checkAnswer(level);
    var randomNumber = Math.floor(4*Math.random());
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // $("#"+randomChosenColour).flash(1,200);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    // console.log(randomChosenColour);
    playSound(randomChosenColour);
    level ++;    
    $("h1").text("level "+level);
    // console.log(level);
}
//handler function |>>
$(".btn").click(function(){
if(userClickedPattern.length<level){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour);
    animatePress(userChosenColour);
    $("#"+userChosenColour).fadeOut(100).fadeIn(100);
    // console.log(userClickedPattern);
    checkAnswer(level);
    
}
})
var started = false;
    $("HTML").keypress(function(){
        if(started == false){
            nextSequence();
        }
        started = true;
})
