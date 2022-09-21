var userClickedPattern = [];
var gamePattern = [];
var randomColors = ["green","blue","red","yellow"];
var started = false;
var level = 0;







$(document).keypress(function(){
    if(!started){
        nextSequence();
    }
});




$(".btn").click(function(){
   
    var clickedButton = $(this).attr("id");
    userClickedPattern.push(clickedButton);
    animatePress(clickedButton);
    playSounds(clickedButton);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    $("#level-title").text("Level "+level);
    level++;
    userClickedPattern = [];
    started = true;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = randomColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animatePress(randomChosenColor);
    playSounds(randomChosenColor);
    // console.log(gamePattern);


}

function animatePress(chosenButton){
    $("#" + chosenButton).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#" + chosenButton).addClass("pressed");
    setTimeout(function(){
        $("#" + chosenButton).removeClass("pressed");  
    },100);
}

function playSounds(chosenButton){
    var audio = new Audio("sounds/"+chosenButton+".mp3");
    audio.play();
}

function checkAnswer(lastIndex){
    if( userClickedPattern[lastIndex] == gamePattern[lastIndex]){
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
              nextSequence();   
            },500);
           
        }
    }
    else{
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        
        setTimeout(function(){
            $("body ").removeClass("game-over");  
        },100);
        gameOver();
    }
}

function gameOver(){
    level = 0;
    gamePattern = [];
    started = false;
    $("#level-title").text("Press Any Key to Start");
}