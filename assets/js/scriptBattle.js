var battleButton = $("#battle-button")
var wildPokemon = []
var caughtPokemon = []
var wildPokemonSprite
var moveName1;
var moveName2;
var moveName3;
var moveName4;
var moveType1;
var moveType2;
var moveType3;
var moveType4;
generatePokemonAry();
getPokemon();
getWildPokeAPI();
getUserPokeAPI();
storePokemon();


//TODO: battle button that starts the pokemon battle game.
$("#battle-button").on("click", function(event){
    event.preventDefault();
    console.log("testing button")
    $(".battle-home").hide();
    $("#main-battle").show();
});

//TODO: function that accesses the Poke Api to assign random pokemon to the user array
function getWildPokeAPI(){
    var wildNumber = wildPokemon[Math.floor(Math.random()*wildPokemon.length)];
    console.log(wildNumber)
    let pokeAPI = `https://pokeapi.co/api/v2/pokemon/${wildPokemon[wildNumber]}/`

    $.ajax({
        url: pokeAPI,
        method: "GET"
    }).then(function(response) {
        console.log(response)

        wildPokemonSprite = response.sprites.front_default;
        

        generateWildPokemon();
        
    })
}
//Function that accesses the Poke Api to assign random pokemon to the user array
function getUserPokeAPI(){
    var userNumber = wildPokemon[Math.floor(Math.random()*wildPokemon.length)];
    caughtPokemon.push(userNumber);
    console.log(caughtPokemon);
    let pokeAPI = `https://pokeapi.co/api/v2/pokemon/${wildPokemon[userNumber]}/`

    $.ajax({
        url: pokeAPI,
        method: "GET"
    }).then(function(response) {
        console.log(response.moves[0].move.url)
        moveName1 = response.moves[0].move.name;
        moveName2 = response.moves[1].move.name;
        moveName3 = response.moves[2].move.name;
        moveName4 = response.moves[3].move.name;
        moveType1 = response.moves[0]
        console.log(move1);
        userPokemonSprite = response.sprites.back_default;
        generatePokemonUser();
        generateMoves();
    })
}
//generates the pokemon array that holds a number from 1 - 898 that equates to the pokedex
function generatePokemonAry(){
    wildPokemon = []

    for (let i = 0; i < 899; i++) {
        wildPokemon.push(i);
        
    }
    return wildPokemon;

}

function storePokemon(){
    localStorage.setItem('wild pokemon', JSON.stringify(wildPokemon));
    localStorage.setItem('caught pokemon', JSON.stringify(caughtPokemon));
}

function getPokemon(){
    var storedWildPokemon = JSON.parse(localStorage.getItem("wild pokemon"));
    var storedCaughtPokemon = JSON.parse(localStorage.getItem("caught pokemon"));

    if (storedCaughtPokemon !==null){
        wildPokemon = storedWildPokemon;
        caughtPokemon = storedCaughtPokemon;
    }
}


//TODO: function that accesses the Poke Api to assign random pokemon to the opponent 
function generateWildPokemon(){
    var wildPokemonImg = $("<img>")
    wildPokemonImg.attr("src", wildPokemonSprite)
    $("#wild-pokemon").append(wildPokemonImg)
}

//TODO: function that uses the assigned pokemon to append the sprite and move buttons to the battle-win.html
function generatePokemonUser(){
    var userPokemonImg = $("<img>")
    userPokemonImg.attr("src", userPokemonSprite)
    $("#user-pokemon").append(userPokemonImg)
}

//TODO: function that uses 4 random moves from the opponent pokemon to interact with the user
function generateMoves(){
    $("#move1").text(moveName1)
    $("#move2").text(moveName2)
    $("#move3").text(moveName3)
    $("#move4").text(moveName4)
}

//TODO: battle sequence function that is the core of the app that pulls from other functions

//onclicks for move buttons 1-4 that will do damage based off of the typing
$("#move1").on("click", function(event){
    event.preventDefault();
    console.log(move1);
});

$("#move2").on("click", function(event){
    event.preventDefault();

});

$("#move3").on("click", function(event){
    event.preventDefault();

});

$("#move4").on("click", function(event){
    event.preventDefault();

});




    //TODO: User is able to press a button from 4 moves that will do damage based off of typing

    //TODO: Tracking variable of health will go down depending on the damage of the move that was used.

    //TODO: opponent pokemon will use random move that will deal damage to the user's pokemon tracking variable 

    //TODO: once the user pokemon tracking health reaches 0 then go to index.html 

    //TODO: once the oppononent pokemon tacking health reaches 0 then go to gallery.html


