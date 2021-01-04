var battleButton = $("#battle-button")
var wildPokemon = []
var caughtPokemon = []
var pickedPokemon = []
var wildPokemonSprite
var wildPokemonType = []
var userPokemonType = []
var wildMoves = []
var wildHealth = 100;
var userHealth = 100;
var damage = 10;
//user pokemon move name variables
var moveName1;
var moveName2;
var moveName3;
var moveName4;
//user pokemon move type variables
var moveType1;
var moveType2;
var moveType3;
var moveType4;
//wild pokemon move name variables
var wildMoveName1;
var wildMoveName2;
var wildMoveName3;
var wildMoveName4;
//wild pokemon move type variables
var wildMoveType1;
var wildMoveType2;
var wildMoveType3;
var wildMoveType4;
var TYPES = ["normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel"];
var pokeTypes = {
    normal: 0,
    fire: 1,
    water: 2,
    electric: 3,
    grass: 4,
    ice: 5,
    fighting: 6,
    poison: 7,
    ground: 8,
    flying: 9,
    psychic: 10,
    bug: 11,
    rock: 12,
    ghost: 13,
    dragon: 14,
    dark: 15,
    steel: 16,
    fairy: 17,
};
var pokeTypesEffect = {
  normal: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5, 1],
  fire: [1, 0.5, 0.5, 1, 2, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1],
  water: [1, 2, 0.5, 1, 0.5, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1],
  electric: [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1, 1],
  grass: [1, 0.5, 2, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 1],
  ice: [1, 0.5, 0.5, 1, 2, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5, 1],
  fighting: [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2, 0.5],
  poison: [1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0, 2],
  ground: [1, 2, 1, 2, 0.5, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2, 1],
  flying: [1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5, 1],
  psychic: [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5, 1],
  bug: [1, 0.5, 1, 1, 2, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5, 0.5],
  rock: [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5, 1],
  ghost: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 0.5, 1],
  dragon: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5, 0],
  dark: [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 0.5, 0.5],
  steel: [1, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5, 2],
  fairy: [1, 0.5, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 2, 2, 0.5, 1],
};

generatePokemonAry();
getPokemon();
storePokemon();

//TODO: battle button that starts the pokemon battle game.
$("#battle-button").on("click", function(event){
    event.preventDefault();
    $(".battle-home").hide();
    $("#main-battle").show();

    if (pickedPokemon.length === 0)
    {
        getUserPokeAPI();
        getWildPokeAPI();
    }
    
});
function removeUserPoke(wildPokeNum){
    
    for (var i = 0; i < wildPokemon.length; i++) {
        if (wildPokemon[i] === wildPokeNum){
            wildPokemon.splice(i, 1);
        }
    }
}
//TODO: function that accesses the Poke Api to assign random pokemon to the user array
function getWildPokeAPI(){
    var wildNumber = wildPokemon[Math.floor(Math.random()*wildPokemon.length)];
    let pokeAPI = `https://pokeapi.co/api/v2/pokemon/${wildPokemon[wildNumber]}/`
    removeUserPoke(wildNumber);
    storePokemon();
    getPokemon();
    $.ajax({
        url: pokeAPI,
        method: "GET"
    }).then(function(response) {
        // console.log(response)
        wildMoveName1 = response.moves[0].move.name;
        wildMoveName2 = response.moves[1].move.name;
        wildMoveName3 = response.moves[2].move.name;
        wildMoveName4 = response.moves[3].move.name;
        
        response.types.forEach(element => wildPokemonType.push(element.type.name))
        wildPokemonSprite = response.sprites.front_default;
        console.log(wildPokemonType)
        console.log(wildMoves);
        generateWildPokemon();
        getWildPokeType1();
        getWildPokeType2();
        getWildPokeType3();
        getWildPokeType4(); 
        
    })
}
function getWildPokeType1(){
    var wildPokeMoveType1 = wildMoveName1;
    let moveAPI = `https://pokeapi.co/api/v2/move/${wildPokeMoveType1}/`;
    
    $.ajax({
        url: moveAPI,
        method: "GET"
    }).then(function(value) {
        wildMoveType1 = value.type.name;
        wildMoves.push(wildMoveType1);
    })
}

function getWildPokeType2(){
    var wildPokeMoveType2 = wildMoveName1;
    let moveAPI = `https://pokeapi.co/api/v2/move/${wildPokeMoveType2}/`;
    
    $.ajax({
        url: moveAPI,
        method: "GET"
    }).then(function(value) {
        wildMoveType2 = value.type.name;
        wildMoves.push(wildMoveType2)
    })
}

function getWildPokeType3(){
    var wildPokeMoveType3 = wildMoveName3;
    let moveAPI = `https://pokeapi.co/api/v2/move/${wildPokeMoveType3}/`;
    
    $.ajax({
        url: moveAPI,
        method: "GET"
    }).then(function(value) {
        wildMoveType3 = value.type.name;
        wildMoves.push(wildMoveType3)
    })
}

function getWildPokeType4(){
    var wildPokeMoveType4 = wildMoveName4;
    let moveAPI = `https://pokeapi.co/api/v2/move/${wildPokeMoveType4}/`;
    
    $.ajax({
        url: moveAPI,
        method: "GET"
    }).then(function(value) {
        wildMoveType4 = value.type.name;
        wildMoves.push(wildMoveType4)
    })
}
//Function that accesses the Poke Api to assign random pokemon to the user array
function getUserPokeAPI(){
    var userNumber = wildPokemon[Math.floor(Math.random()*wildPokemon.length)];
    caughtPokemon.push(userNumber);
    console.log(caughtPokemon);
    let pokeAPI = `https://pokeapi.co/api/v2/pokemon/${wildPokemon[userNumber]}/`
    removeUserPoke(userNumber);
    storePokemon();
    getPokemon();
    $.ajax({
        url: pokeAPI,
        method: "GET"
    }).then(function(response) {
        console.log(response.moves)
        var allUserMoves = response.moves;
        var randomMove1 = Math.floor(Math.random()*allUserMoves.length);
        var randomMove2 = Math.floor(Math.random()*allUserMoves.length);
        var randomMove3 = Math.floor(Math.random()*allUserMoves.length);
        var randomMove4 = Math.floor(Math.random()*allUserMoves.length);
        moveName1 = response.moves[randomMove1].move.name;
        moveName2 = response.moves[randomMove2].move.name;
        moveName3 = response.moves[randomMove3].move.name;
        moveName4 = response.moves[randomMove4].move.name;
        
        response.types.forEach(element => userPokemonType.push(element.type.name))
        userPokemonSprite = response.sprites.back_default;
        generatePokemonUser();
        generateMoves();
        getUserPokeType1();
        getUserPokeType2();
        getUserPokeType3();
        getUserPokeType4();
        
    })
}
function getUserPokeType1(){
    var pokeMoveType1 = moveName1
    let moveAPI = `https://pokeapi.co/api/v2/move/${pokeMoveType1}/`;
    console.log(moveAPI);
    $.ajax({
        url: moveAPI,
        method: "GET"
    }).then(function(value) {
        moveType1 = value.type.name;
    })
}

function getUserPokeType2(){
    var pokeMoveType2 = moveName2
    let moveAPI = `https://pokeapi.co/api/v2/move/${pokeMoveType2}/`;
    $.ajax({
        url: moveAPI,
        method: "GET"
    }).then(function(value) {
        moveType2 = value.type.name;
    })
}

function getUserPokeType3(){
    var pokeMoveType3 = moveName3
    let moveAPI = `https://pokeapi.co/api/v2/move/${pokeMoveType3}/`;
    $.ajax({
        url: moveAPI,
        method: "GET"
    }).then(function(value) {
        moveType3 = value.type.name;
    })
}

function getUserPokeType4(){
    var pokeMoveType4 = moveName4
    let moveAPI = `https://pokeapi.co/api/v2/move/${pokeMoveType4}/`;
    $.ajax({
        url: moveAPI,
        method: "GET"
    }).then(function(value) {
        moveType4 = value.type.name;
    })
}
//generates the pokemon array that holds a number from 1 - 898 that equates to the pokedex
function generatePokemonAry(){
    wildPokemon = []

    for (let i = 0; i < 809; i++) {
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
    wildPokemonImg.height(150).width(150);
    $("#wild-pokemon").append(wildPokemonImg)
}

//TODO: function that uses the assigned pokemon to append the sprite and move buttons to the battle-win.html
function generatePokemonUser(){
    var userPokemonImg = $("<img>")
    userPokemonImg.attr("src", userPokemonSprite)
    userPokemonImg.height(150).width(150);
    $("#user-pokemon").append(userPokemonImg)
}

//TODO: function that uses 4 random moves from the opponent pokemon to interact with the user
function generateMoves(){
    $("#move1").text(moveName1)
    $("#move2").text(moveName2)
    $("#move3").text(moveName3)
    $("#move4").text(moveName4)
}

function userTurn(){

}


function wildTurn(){
    var randomNum = Math.floor(Math.random()*4);
    
    console.log(wildMoves)
    var randomWildMove = wildMoves[randomNum];
     
    
    console.log(randomWildMove)
    
    getDamageWild(randomWildMove)
    enableMoves();
}

function getDamageUser(userMove){
//    var damage1 =  pokeTypesEffect[testvariable][pokeTypes[wildPokemonType[0]]]
//    var damage2 =  pokeTypesEffect[testvariable][pokeTypes[wildPokemonType[1]]]
//    var multiplier = damage1 + damage2;
//    console.log(multiplier)
    damage = 10;
    for (var i = 0; i < wildPokemonType.length; i++) {
            var multiplier = pokeTypesEffect[userMove][pokeTypes[wildPokemonType[i]]]
            damage = damage * multiplier;
            
    }
    console.log(damage)
    wildHealth = wildHealth - damage;
    $("#wild-health").val(wildHealth);
    disableMoves();
}

function getDamageWild(wildMove){
    damage = 10;
    for (var i = 0; i < wildPokemonType.length; i++) {
        var multiplier = pokeTypesEffect[wildMove][pokeTypes[wildPokemonType[i]]]
        damage = damage * multiplier;
    }
    userHealth = userHealth - damage;
    $("#user-health").val(userHealth);
}

function disableMoves(){
    $("#move1").attr('disabled', true);
    $("#move2").attr('disabled', true);
    $("#move3").attr('disabled', true);
    $("#move4").attr('disabled', true);
}

function enableMoves(){
    $("#move1").attr('disabled', false);
    $("#move2").attr('disabled', false);
    $("#move3").attr('disabled', false);
    $("#move4").attr('disabled', false);
}
//TODO: battle sequence function that is the core of the app that pulls from other functions

//onclicks for move buttons 1-4 that will do damage based off of the typing
$("#move1").on("click", function(event){
    event.preventDefault();
    
    getDamageUser(moveType1)
    wildTurn();
    // console.log(moveType1);
    // console.log(wildPokemonType[0])
    // console.log(pokeTypesEffect[moveType1][pokeTypes[wildPokemonType[0]]])
    // console.log(pokeTypes[wildPokemonType[0]])
});

$("#move2").on("click", function(event){
    event.preventDefault();
    // console.log(moveType2);
    getDamageUser(moveType2)
    wildTurn();
});

$("#move3").on("click", function(event){
    event.preventDefault();
    // console.log(moveType3);
    getDamageUser(moveType3)
    wildTurn();
});

$("#move4").on("click", function(event){
    event.preventDefault();
    console.log(moveType4);
    getDamageUser(moveType4)
    wildTurn();
});




    //TODO: User is able to press a button from 4 moves that will do damage based off of typing

    //TODO: Tracking variable of health will go down depending on the damage of the move that was used.

    //TODO: opponent pokemon will use random move that will deal damage to the user's pokemon tracking variable 

    //TODO: once the user pokemon tracking health reaches 0 then go to index.html 

    //TODO: once the oppononent pokemon tacking health reaches 0 then go to gallery.html


