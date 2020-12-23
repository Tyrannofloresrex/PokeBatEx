var battleButton = $("#battle-button")
var wildPokemon = []
var caughtPokemon = []
console.log("hello world")
generatePokemonAry();
getPokeAPIs();

//TODO: battle button that starts the pokemon battle game.
$("#battle-button").on("click", function(){
    
    console.log("testing button")
});

//TODO: function that accesses the Poke Api to assign random pokemon to the user array
function getPokeAPIs(){
    var number = wildPokemon[Math.floor(Math.random()*wildPokemon.length)];
    console.log(number)
    let pokeAPI = `https://pokeapi.co/api/v2/pokemon/${number}/`

    $.ajax({
        url: pokeAPI,
        method: "GET"
    }).then(function(response) {
        console.log(response)
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


//TODO: function that accesses the Poke Api to assign random pokemon to the opponent 

//TODO: function that uses the assigned pokemon to append the sprite and move buttons to the battle-win.html

//TODO: function that uses 4 random moves from the opponent pokemon to interact with the user

//TODO: battle sequence function that is the core of the app that pulls from other functions

    //TODO: User is able to press a button from 4 moves that will do damage based off of typing

    //TODO: Tracking variable of health will go down depending on the damage of the move that was used.

    //TODO: opponent pokemon will use random move that will deal damage to the user's pokemon tracking variable 

    //TODO: once the user pokemon tracking health reaches 0 then go to index.html 

    //TODO: once the oppononent pokemon tacking health reaches 0 then go to gallery.html


