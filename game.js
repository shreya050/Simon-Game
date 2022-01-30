
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started=false;
var level=0;

$(document).on("keypress",function() {
    if(!started){
        $("#level-title").text("Level  "+ level);
        nextSequence();
        started=true;
    }
});
$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    animatePress(userChosenColour);
    makeSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


// $("h1").html("Press A Key to Start");

function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level  "+ level);
    var randomNumb = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumb];
    gamePattern.push(randomChosenColour);
    //  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    // var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    // audio.play();
    makeAnimation(randomChosenColour);
    makeSound(randomChosenColour);
}

function checkAnswer(level) {
    if(userClickedPattern[level]===gamePattern[level]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function () {
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        makeSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        },200);
        $("#level-title").html("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function startOver() {
    level=0;
    gamePattern=[];
    started=false;
}


function makeAnimation(key) {
    $('#' + key).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function makeSound(key) {
    console.log("sound made");
    var k = new Audio("sounds/" + key + ".mp3");
    k.play();
}
function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $("#"+currentColour).removeClass("pressed")
    }, 100);
}

// switch (key) {
//     case "red":
//         var red = new Audio('sounds/red.mp3');
//         red.play();
//         break;
//     case "blue":
//         var blue = new Audio('sounds/blue.mp3');
//         blue.play();
//         break;
//     case "green":
//         var green = new Audio('sounds/green.mp3');
//         green.play();
//         break;
//     case "yellow":
//         var yellow = new Audio('sounds/yellow.mp3');
//         yellow.play();
//         break;
//     case "wrong":
//         var wrong = new Audio('sounds/wrong.mp3');
//         wrong.play();
//         break;
//     default:
//         break;
// }