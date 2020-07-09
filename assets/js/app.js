// var intervalId;
//     var count = 5;
//     var dual = true;
//     var solo = false;
//     var currentPlayer = "playerTwo";
//     var playerOneOut = false;
//     var playerTwoOut = false;
//     function gameOver(){
//       alert("gameOver")
//     }
//     function timer(){
//       count --
//       if(count==0){
//         if (solo){
//           gameOver()
//         }
//         else if(dual){
//           if(playerOneOut || playerTwoOut){
//             gameOver()
//           }
//           else{
//             if(currentPlayer === "playerOne") currentPlayer = "playerTwo";
//             else{
//               currentPlayer = "playerOne"
//             }
//           }
//         }
//       }
//       $("#timerDisplay").html(count)
//       console.log(currentPlayer)

      
//     }
//     $(document).ready(function(){
//       setInterval(timer, 1000)
//     })
    
//     $("#testButton").on("click", function(){
//       if(dual){
//         if(currentPlayer === "playerOne") currentPlayer = "playerTwo";
//         else{
//           currentPlayer = "playerOne"
//       }
//       }
//       else{
//         gameOver();
//       }
      
//       console.log(currentPlayer)
//     })












// Your web app's Firebase configuration
// var userGuess;
var movie = "";
var actor = "";
var actorID = 0;
var movieID = 0;

var movieArray = [];
var filmographyArray = [];
var actorArray = [];
var playerArray = [];
var guessesArray = [];
var movieImage = "";

var actorConfig;
var actorImage = ""
var getConfig = "https://api.themoviedb.org/3/configuration?api_key=20748fb6c1ff9fc0bd764838374d9f26"
// var confirmImage = false;
// var playerGuesses = 3;
var turn = 0
var intervalId;
var count = 10;
var round = 1;

var startClicked = false;
var firstActorSelected = false;
var turnComplete = false;
var dual = false;
var solo = false;
var gameStart = false;
// var loading = false;
var gameOverBoolean = false;
var pOneScore = 0;
var pTwoScore = 0;
var pOneStrikes = 0;
var pTwoStrikes = 0;
var currentPlayer = "Player One";
var playerOneOut = false;
var playerTwoOut = false;
var defaultImage = "https://i.ibb.co/kJysHbr/image-Frame.gif";
// defaultImage.attr("src", "../assets/images/clapperBoard.jpg");
// var defaultImage = $("<img src='../images/clapperBoard.jpg'/>")


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!START CLICK needs to be added to reset


// Start Game

$(document).ready(function(){
    getConfigData();
    startScreen();   
});

function startScreen(){
    pOneScore = 0;
    pTwoScore = 0;
    $("#posterPic").html("<img class='gifControl' src='./assets/images/curtainLeft.png' />")
    $("#firstActor").html("<img class='gifControl' src='./assets/images/curtainLeft.png' />")
    $("#secondActor").html("<img class='gifControl' src='./assets/images/curtainLeft.png' />")
    setTimeout(function(){
        var startDiv = $("<div>");
        startDiv.addClass("gifControl");
        var startText = $("<p>");
        startText.addClass("gifText")
        startText.text("CLICK TO START");
        startDiv.html(startText);
        $("#posterPic").html(startDiv);
    },1200)
};
// Onclick for starting game

$("#posterPlate").on("click", function(){
    if (startClicked){
        return false;
    }
    else if(gameOverBoolean===true){
        startClicked = false;
        gameOverBoolean = false;
        solo = false;
        dual = false;
        turn = 0;
        startScreen()
    }
    else{
    startClicked = true;
    
    console.log(1)
    var playerOne = $("<p>").addClass("gifText");
    var playerTwo = $("<p>").addClass("gifText");
    var startText = $("<p>").addClass("gifText");

    playerOne.text("One Player");
    playerTwo.text("Two Players");
    startText.html("Select How" + "<br />" + "Many Players");


    var playerOneDiv = $("<div>");
    playerOneDiv.addClass("gifControl");
    playerOneDiv.html(playerOne);
    

    var playerTwoDiv = $("<div>");
    playerTwoDiv.addClass("gifControl");
    playerTwoDiv.html(playerTwo);  
    
    var startDiv = $("<div>");
    startDiv.addClass("gifControl");
    startDiv.html(startText);

    $("#posterPic").html(startDiv);
    $("#firstActor").html(playerOneDiv);
    $("#secondActor").html(playerTwoDiv);    
    }
     
})

// onClick functions for selecting the number of players

$(document).on("click", "#facePlate1", function(){
    if(dual === true || solo === true || startClicked === false){
        return false;
    }
    solo = true;
    gameStart = true;
    beginGame()
})

$(document).on("click", "#facePlate2", function(){
    if(dual ===true || solo === true || startClicked === false){
        return false;
    }
    dual = true;
    gameStart = true;
    beginGame()
})

// function loadingSegment(){
//     if(turnComplete===true){
//         $("#posterPic").html("<img class='gifControl' src='./assets/images/curtainLeft.png' />")
//         $("#firstActor").html("<img class='gifControl' src='./assets/images/curtainLeft.png' />")
//         $("#secondActor").html("<img class='gifControl' src='./assets/images/curtainLeft.png' />")
//         setTimeout(function(){
//             updateBoard()   
//         },1000)   
//     }    
// }

function turnControl(){

    if((playerOneOut === true|| playerTwoOut===true) && (dual===true)){
        console.log("turncontrol1")
        currentPlayer = currentPlayer === "Player One" ? "Player Two" : "Player One";

        $("#playerName").text(currentPlayer)         
     }
     else if(solo === true){
         console.log(currentPlayer + "solo")
         $("#playerName").text("Player One")
         roundControl()
         return false;
     }
     else if((playerOneOut === true && playerTwoOut===true)){
         console.log("pone and ptwo out")
         gameOver()
     } 
    currentPlayer = currentPlayer === "Player One" ? "Player Two" : "Player One";
    console.log(currentPlayer + "turnControl")
    $("#playerName").text(currentPlayer)
    roundControl()
    }

function roundControl(){
    if (round === 3){
        round = 1
    }
    else{
        round ++
        roundTimer()
    }
}


function roundTimer(){
    if (gameOverBoolean === true){
        return false;
    }

    var promptText = "";
    var turnPrompter = $("<div>");
    turnPrompter.addClass("gifControl");
    var turnPrompt = $("<p>")
    turnPrompt.addClass("gifText")
    turnPrompt.text(promptText)
    // turnPrompt.css({"color":"white", "font-size":" 15px", "text-align":"center"})
    // var playerPrepend = currentPlayer;
    turnPrompter.html(turnPrompt)
    switch(round){
        case 1 : 
            console.log("round 1");
             
            promptText = "Select First Actor"
            turnPrompt.html(promptText)

            $("#posterPic").html(turnPrompter);

            break;
        case 2: 
            promptText = "Select Movie"
            turnPrompt.html(promptText)

            $("#posterPic").html(turnPrompter);

            break;
        case 3: 
            promptText = "Select Second Actor"
            turnPrompt.html(promptText)

            $("#secondActor").html(turnPrompter);
            break;
    }

    count=10;
    setTimeout(function(){
            intervalId = setInterval(function(){
            count--;
            var imageUrl = "https://i.ibb.co/Zz1mh4m/clapper-Board.png"
            var counterDiv = $("<div>");
            counterDiv.css({"background-image":"url(" + imageUrl + ")", "background-position": "center",   "background-size": "auto"})
            counterDiv.addClass("gifControl")
            var countText = $("<p>")
            countText.addClass("gifText")
            countText.text(count)
            countText.css({"color":"white", "font-size":" 15px", "text-align":"center"})
            counterDiv.html(countText)
            if((round===1) || (round===2)){
                $("#posterPic").html(counterDiv);
            }
            if(round===3){
                $("#secondActor").html(counterDiv);
            }

            if((count<=0) && ((playerOneOut===true) || (playerTwoOut===true)) ){
                console.log(playerOneOut + "------------------------------------")
                clearInterval(intervalId);
                gameOver()
            }
            else if((count<=0) && (dual===true)){
                console.log("ELSE IF -----------------------------------------------")
                clearInterval(intervalId);
                if(currentPlayer === "Player One"){
                    pOneStrikes++;
                    console.log(pOneStrikes + "PONE TIME")
                    playerOneOut = true; 
                    if(pOneStrikes === 3){
                        gameOver()
                    }
                    console.log("fired")
                    currentPlayer = "Player Two"; 

                }
                else if(currentPlayer === "Player Two"){
                    pTwoStrikes++;
                    console.log(pTwoStrikes + "PTWO TIME")
                    playerTwoOut=true;
                    if(pTwoStrikes === 3){
                        gameOver()
                    }

                    currentPlayer = "Player One";
                
                }
                //  ? playerOneOut = true : playerTwoOut = true)
                // if(currentPlayer = "Player One" ? currentPlayer = "Player Two" : currentPlayer = "Player One" )


                console.log(currentPlayer + "roundTimer")
                console.log(playerOneOut)
                // currentPlayer = currentPlayer === "Player One" ? "Player Two" : "Player One";

                $("#playerName").text(currentPlayer)
                roundTimer();

                }
            else if((count<=0) && (solo===true)){
                clearInterval(intervalId);
                pOneStrikes ++;
                console.log(pOneStrikes)
                if(pOneStrikes === 3){
                    gameOver()
                }
                roundTimer()
            }  
        },1000)  
    },1500)
    
}

// ajax call for base URL for all tmdb API calls *************************************************
function getConfigData() {
    $.ajax({
        "async": true,
        "crossDomain": true,
        url: getConfig,
        method: "GET",
        "headers": {},
        "data": "{}"
    })
        .then(function (response) {
            console.log(response)
            console.log(response.images.logo_sizes[4])
            actorConfig = response.images.base_url + response.images.logo_sizes[4];
            // movieConfig = response.images no longer used 
            console.log(actorConfig);
            // getActorImage();
            // beginGame()

        });

}

/************************************************logic for first actor picks**************/

function getFirstImage() {
    var getActorID = "https://api.themoviedb.org/3/search/person?api_key=20748fb6c1ff9fc0bd764838374d9f26&language=en-US&query=" + actor + "&page=1&include_adult=false"

    $.ajax({
        "async": true,
        "crossDomain": true,
        url: getActorID,
        method: "GET",
        "headers": {},
        "data": "{}"
    })
        .then(function (response) {
            console.log(response)
            
            if (response.results.length > 0) {
                console.log(response.results[0].id)
                console.log(response.results[0].profile_path)
                var object = {}
                object["name"] = actor;
                object["id"] = response.results[0].id;
                if(response.results[0].profile_path === null ? object["image"] = defaultImage : object["image"] = response.results[0].profile_path)
                console.log(response.results[0].profile_path)
                actorArray.push(object);
                console.log(actorArray)
                guessesArray.push(actor)
                actorID = response.results[0].id;
                console.log(actorID + "Actor ID for looking up filmography")
                getFirstFilmography();
            };

        })
}


function getFirstFilmography() {
    var filmography = "https://api.themoviedb.org/3/person/" + actorID + "/movie_credits?api_key=20748fb6c1ff9fc0bd764838374d9f26&language=en-US"

    $.ajax({
        "async": true,
        "crossDomain": true,
        url: filmography,
        method: "GET",
        "headers": {},
        "data": "{}"
    })
        .then(function (response) {
            console.log(response)
            console.log(actorArray)
            for (i = 0; i < response.cast.length; i++) {
                filmographyArray[i] = response.cast[i].id
            }

            if(firstActorSelected === true){
                if (movieArray.includes(actorID)) {
                    checkActor();
                }
                else {
                    actorArray.pop()
                    $("#userInput").val(" ");
                    if(solo === true){
                        pOneStrikes ++
                        console.log(pOneStrikes)
                        if(pOneStrikes === 3){
                          gameOver()  
                        } 
                    }
                    else if (dual === true){
                        if (currentPlayer === "Player One"){
                        pOneStrikes ++;
                        console.log(pOneStrikes + "PONE STRIKE")
                        if(pOneStrikes === 3){
                            gameOver();
                        }
                        playerOneOut = true;
                        clearInterval(intervalId);
                        currentPlayer = "Player Two"
                        $("#playerName").text(currentPlayer)
                        roundTimer()


                        }
                        else{
                            pTwoStrikes ++
                            console.log(currentPlayer)
                            console.log(pTwoStrikes + "PTWO STRIKE")
                            if(pTwoStrikes ===3) {
                                gameOver()   
                            } 
                            playerTwoOut = true;
                            console.log(playerTwoOut)
                            clearInterval(intervalId);
                            currentPlayer = "Player One";
                            $("#playerName").text(currentPlayer)

                            roundTimer()


                        } 
                    }
                                        // if (currentPlayer === "Player One"){
                    //     pOneStrikes ++;
                    //     console.log(pOneStrikes)

                    //     if(pOneStrikes === 3) gameOver()

                    // }
                    // else{
                    //     pTwoStrikes ++
                    //     console.log(pTwoStrikes)

                    //     if(pTwoStrikes ===3) gameOver()
                    // }   
                }
            }
            else{
                firstActorSelected = true;
                displayFirstPicture();
                $("#input-description").html("Select Movie");
            }
        })
}

function displayFirstPicture() {
    clearInterval(intervalId)
    console.log(actorArray)

    console.log("turn" + turn + "------------------------")
    if(actorArray[turn].image.includes(defaultImage)){
        conc = actorArray[turn].image
    }
    else{
        conc = actorConfig + actorArray[turn].image;
    }
    if (turn ===0){
        console.log(actorArray[turn].image)
        console.log(actorConfig)
        $("#firstActor").html(`<img class= "gifControl" src="${conc}"  alt="Gif"></div>`+"<div class='actorName'>" + actor.toUpperCase() + "</div>"  ) 
        turn++    
    }
    else if (turnComplete === true){
        $("#firstActor").html(`<img class= "gifControl" src="${conc}"  alt="Gif"></div>`+"<div class='actorName'>" + actor.toUpperCase() + "</div>"  )
        turn ++;
        turnComplete = false;
        playerOneOut = false;
        playerTwoOut = false;

    }
    else{
        $("#secondActor").html(`<img class= "gifControl" src="${conc}"  alt="Gif"></div>`+"<div class='actorName'>" + actor.toUpperCase() + "</div>")    
    }
    // clearInterval(intervalId)
    turnControl()
}



function checkScore(){
    if (playerOneOut === true){
        pTwoScore ++
        console.log(pTwoScore)
    }
    else if ((playerTwoOut === true)||(solo === true)){
        pOneScore ++
        console.log(pOneScore)
    }
    else{
        pTwoScore ++
        pOneScore ++
        console.log(pOneScore + "----------" + pTwoScore ) 
    }
}


function checkActor() {
    movieArray = [];
    guessesArray.push(actor)
    displayFirstPicture();
    turnComplete = true;
    checkScore();
    setTimeout(updateBoard, 1000);
}

function updateBoard() { 
    console.log("update")  
    $("#userInput").val(" ");
    $("#submit-answer").attr("data", "movie");
    $("#input-description").html("Select Movie")
        $("#posterPic").html("<img class='gifControl' src='./assets/images/curtainLeft.png' />")
        $("#firstActor").html("<img class='gifControl' src='./assets/images/curtainLeft.png' />")
        $("#secondActor").html("<img class='gifControl' src='./assets/images/curtainLeft.png' />")
        setTimeout(function(){
            displayFirstPicture();
        },1000 * 2)   
    } 
    // $("#secondActor").empty();
    // $("#posterPic").empty();



// function displayPicture() {
//     conc = actorConfig + actorArray[turn].image;
//     $("#secondActor").html(`<img class= "gifControl" src="${conc}"  alt="Gif"></div>`+"<div class='actorName'>" + actor.toUpperCase() + "</div>")
//     setTimeout(updateBoard, 1000 * 3);


// }

/*********************************************handles user guess for movie***************************/


function getMovieImage() {
    console.log(movie)
    var getMovieID = "https://api.themoviedb.org/3/search/movie?api_key=20748fb6c1ff9fc0bd764838374d9f26&language=en-US&query=" + movie + "&page=1&include_adult=false"

    $.ajax({
        "async": true,
        "crossDomain": true,
        url: getMovieID,
        method: "GET",
        "headers": {},
        "data": "{}"
    })
        .then(function (resp) {
            // var movieIdArray = [];
            console.log(resp) 
            console.log(movie)

            for(let i=0; i<resp.results.length; i++){   
                // console.log(resp.results[i])            
                if((filmographyArray.includes(resp.results[i].id)) && (movie.toLowerCase() === resp.results[i].title.toLowerCase())){
                    console.log(resp.results[i].title)
                    movieImage = resp.results[i].poster_path
                    movieID = resp.results[i].id
                    getCast()
                    break;   
                }
                else if ((i>=resp.results.length -1)){
                    $("#userInput").val(" ");
                    console.log("you has strike 111")
                    // if ((pOneStrikes === 3) || (pTwoStrikes ===3)){
                    //     alert("YES")
                    //     gameOver();
                    // }

                    // $("#userInput").val(" ");
                    if(solo === true){
                        pOneStrikes ++
                        console.log(pOneStrikes)
                        if(pOneStrikes === 3){
                          gameOver()  
                        } 
                    }
                    else if (dual === true){
                        if (currentPlayer === "Player One"){
                        pOneStrikes ++;
                        console.log(pOneStrikes + "PONE STRIKE MOVIE")
                        if(pOneStrikes === 3){
                            gameOver();
                        }
                        playerOneOut = true;
                        clearInterval(intervalId);
                        currentPlayer = "Player Two"
                        $("#playerName").text(currentPlayer)
                        roundTimer()


                        }
                        else{
                            pTwoStrikes ++
                            console.log(currentPlayer)
                            console.log(pTwoStrikes + "PTWO STRIKE MOVIE")
                            if(pTwoStrikes ===3) {
                                gameOver()   
                            } 
                            playerTwoOut = true;
                            console.log(playerTwoOut)
                            clearInterval(intervalId);
                            currentPlayer = "Player One";
                            $("#playerName").text(currentPlayer)

                            roundTimer()


                        } 
                    }
                    // if (currentPlayer === "Player One"){
                    //     pOneStrikes ++
                    //     console.log(pOneStrikes + "PONE STRIKE")

                    //     if(pOneStrikes === 3) gameOver()
                    // }
                    // else{
                    //     pTwoStrikes ++
                    //     console.log(pTwoStrikes + "PTWOSTRIKE")

                    //     if(pTwoStrikes ===3) gameOver()
                    // }                  
                }
                   
            }
            console.log(movieID)

        })


}



function getCast() {
    var cast = "https://api.themoviedb.org/3/movie/" + movieID + "/credits?api_key=20748fb6c1ff9fc0bd764838374d9f26&language=en-US"

    $.ajax({
        "async": true,
        "crossDomain": true,
        url: cast,
        method: "GET",
        "headers": {},
        "data": "{}"
    })
        .then(function (response) {
            console.log(response )
            console.log(filmographyArray) 
            console.log(movieID)
            for (i = 0; i < response.cast.length; i++) {
                movieArray[i] = response.cast[i].id
                // console.log(movieArray)
            }
            if (filmographyArray.includes(movieID)) {
                console.log(filmographyArray) 
                console.log(movieID)
                checkMovie();
            }
            // else {
            //     $("#userInput").val(" ");
            //     console.log("you has strike")
            //     // M.toast({ html: 'You have A Strike' })
            //     strikes++
            // }
        })


}

function checkMovie() {
    filmographyArray = [];
    guessesArray.push(movie);
    displayPoster();
    $("#userInput").val(" ");
    $("#input-description").html("Select Next Actor")
    $("#submit-answer").attr("data", "actor")

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////REVISE BELOW + AJAX NOT NEEDED////////////////////
function displayPoster() {
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=77f524c2";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var imgURL = actorConfig + movieImage;
        console.log(actorConfig)
        console.log(imgURL)
        clearInterval(intervalId);
        turnControl();

        $("#posterPic").html(`<img class= "gifControl" src="${imgURL}"  alt="Gif"></div>`);
    });
};







/**********************************Game starting********************* */

function beginGame() {
    // resets all global variables to default values
    resetVariables();
    // roundTimer();
    // sets players turn order
    // setOrderofPlay(); 
    // runs all functions needed for each round 
    // Round();
    $("#firstActor").html("<img src='../TheMovieGame/assets/images/curtainLeft.png' class='gifControl'/>")
    $("#secondActor").html("<img src='../TheMovieGame/assets/images/curtainLeft.png' class='gifControl'/>");
    // $("#posterPic").html();
    $("#playerName").text(currentPlayer)
    $("#input-description").html("Select First Actor")
    $("#submit-answer").attr("data", "first")
    roundTimer();

}

function gameOver(){
    var gameOverPrompt= "Game Over!";
    var gameOverDiv = $("<div>")
    gameOverDiv.addClass("gifControl");
    var gameOverText = $("<p>")
    gameOverText.addClass("gifText")
    gameOverText.text(gameOverPrompt)
    // gameOverText.css({"color":"white", "font-size":" 15px", "text-align":"center"})
    gameOverDiv.html(gameOverText)

    var youWin = "You Win!"
    var youLose = "You lose!"
    var tieGame = "Tie Game!"

    var oneCard = $("<div>").addClass("card text-center scoreCard")
    var oneCardHeader = $("<div>").addClass("card-header").text("Player One")  
    var oneCardBody = $("<div>").addClass("card-body")
    var winOrLose = $("<h5>")
    winOrLose.html(youWin)
    var oneCardFooter = $("<div>").addClass("card-footer")
    var scoreOne = $("<p>").html("Score :" + pOneScore)

    oneCard.append(oneCardHeader)
    oneCard.append(oneCardBody)
    oneCardBody.html(winOrLose)
    oneCardFooter.html(scoreOne)
    oneCard.append(oneCardFooter)

    var twoCard = $("<div>").addClass("card text-center scoreCard")
    var twoCardHeader = $("<div>").addClass("card-header").text("Player Two")  
    var twoCardBody = $("<div>").addClass("card-body")
    var winOrLose2 = $("<h5>")
    winOrLose2.html(youLose)
    var twoCardFooter = $("<div>").addClass("card-footer")
    var scoreTwo = $("<p>").html("Score :" + pTwoScore)

    twoCard.append(twoCardHeader)
    twoCard.append(twoCardBody)
    twoCardBody.html(winOrLose2)
    twoCardFooter.html(scoreTwo)
    twoCard.append(twoCardFooter)
    gameStart = false;
    gameOverBoolean = true;

    clearInterval(intervalId);
    setTimeout(function(){
        gameOverText.text(gameOverPrompt)
        $("#posterPic").html(gameOverDiv)
        $("#firstActor").html("<img class='gifControl' src='./assets/images/curtainLeft.png' />")
        $("#secondActor").html("<img class='gifControl' src='./assets/images/curtainLeft.png' />") 
        playAgain()   
    },2000)
  


    function playAgain(){
        setTimeout(function(){
            // gameOverBoolean = true;
            pOneStrikes = 0;
            pTwoStrikes = 0;
            firstActorSelected = false;
            turnComplete = false;
            actorArray = [];
            guessesArray = [];
            gameOverPrompt = "Click to Play Again";
            gameOverText.text(gameOverPrompt)
            $("#posterPic").html(gameOverDiv)
            startClicked = false;
            if (dual === true){
                if (pOneScore>pTwoScore){
                    $("#firstActor").html(oneCard)
                    $("#secondActor").html(twoCard)  
                }
                else if (pOneScore===pTwoScore){
                    winOrLose.html(tieGame)
                    winOrLose2.html(tieGame)
                    $("#firstActor").html(oneCard)
                    $("#secondActor").html(twoCard) 

                }
                else{
                    winOrLose.html(youLose)
                    winOrLose2.html(youWin)
                    $("#firstActor").html(oneCard)
                    $("#secondActor").html(twoCard)
 
                }
            }
            else{
                winOrLose.html("Try Again!")
                $("#firstActor").html(oneCard)
                console.log("4")

            }
        },1500)

    }

    resetVariables();
    console.log("GameOver")
}



$("#submit-answer").on("click", function (event) {
    if((gameOverBoolean === true)||(gameStart === false)){
        console.log("click prevented")
        return false;
    }
    event.preventDefault();
    console.log(turn)
    let attr = $("#submit-answer").attr("data");
    switch(attr){
        case "actor":
            var userGuess = $("#userInput").val().trim().toLowerCase()
            console.log(userGuess);
            actor = userGuess;
            checkActorGuesses();

            if (actor === undefined) {
                return 'undefined value!'
            }
            break;
            

        case "movie":
            var userGuess = $("#userInput").val().trim().toLowerCase()
            console.log(userGuess);
            movie = userGuess;
            checkMovieGuesses();    
            if (movie === undefined) {
                return 'undefined value!'
            }

            break;

        case "first":
            var userGuess = $("#userInput").val().trim().toLowerCase()
            actor = userGuess;
            getFirstImage();
            $("#userInput").val(" ");
            $("#submit-answer").attr("data", "movie");
            if (actor === undefined) {
                return 'undefined value!'
            }
            break;
    };
});


function checkActorGuesses() {
    if (guessesArray.includes(actor)) {
        $("#userInput").val(" ");
        // M.toast({ html: 'Actor already taken' })
    }
    else {
        getFirstImage();
        console.log(actor)
    }
}

function checkMovieGuesses() {
    if (guessesArray.includes(movie)) {
        $("#userInput").val(" ");
        // M.toast({ html: 'Movie already taken' })
    }
    else {
        getMovieImage();
        console.log(movie)
    }
}




function resetVariables() {
    movie = "";
    actor = "";
    actorID = 0;
    movieID = 0;
    round = 1; 
}


// getConfigData()

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 // // Your web app's Firebase configuration
  // var firebaseConfig = {
  //   apiKey: "AIzaSyDz5JbOlm_xQNUzvTxm6iBqdNKs-_LwWyE",
  //   authDomain: "themoviegame-cfc88.firebaseapp.com",
  //   databaseURL: "https://themoviegame-cfc88.firebaseio.com",
  //   projectId: "themoviegame-cfc88",
  //   storageBucket: "themoviegame-cfc88.appspot.com",
  //   messagingSenderId: "1048965913024",
  //   appId: "1:1048965913024:web:197326d281c59af26ed025",
  //   measurementId: "G-8G3VSG85KD"
  // };
  // // Initialize Firebase
  // firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

  // var database = firebase.database();