var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"]; //declaring arrays
var started=false; 
var level=0;

$(".btn").click(function(){          //button press activity 
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){        //game_intitalisation
    if(!started){
        $("#level-title").text("Level" + " " + level);
        nextSequence();
        started=true;
    }
});

function nextSequence(){           //generating the sequence of colours
    level++;
    $("#level-title").text("Level " + level);
    userClickedPattern=[];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
 

function playSound(name){            //play sound 
    var audio = new Audio("sounds/"+ name + ".mp3" );
    audio.play();
}
 
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel) {                //game logic
 
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
        if (userClickedPattern.length === gamePattern.length)
        {  
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } 
      else {                                              //game-over behaviour
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 1000);
      }
  
}