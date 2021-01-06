//declared variables 
var battleButton = $("#battle-button")
var wildPokemon = []
var caughtPokemon = []
var pickedPokemon = 0;
var wildPokemonSprite
var wildPokemonType = []
var userPokemonType = []
var wildNumber 
var allUserMoves 
var randomMove1 
var randomMove2 
var randomMove3 
var randomMove4 
var allWildMoveNames
var wildPokeName
var userPokeName
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

//object to store all the pokemon types to trace the multiplier effect
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
//object to store all the pokemon type colors.
var pokeColor = {
    normal: '#AAB09F',
    fire: '#EA7A3C',
    water: '#539AE2',
    electric: '#E5C531',
    grass: '#71C558',
    ice: '#70CBD4',
    fighting: '#CB5F48',
    poison: '#B468B7',
    ground: '#CC9F4F',
    flying: '#7DA6DE',
    psychic: '#E5709B',
    bug: '#94BC4A',
    rock: '#B2A061',
    ghost: '#846AB6',
    dragon: '#6A7BAF',
    dark: '#736C75',
    steel: '#89A1B0',
    fairy: '#E397D1',
}
//object that stores all of the multiplier numbers depending on the type advantage.
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

//calls upon loadpage function to load the page.
loadPage();
// console.log(pickedPokemon);
// battle button that starts the pokemon battle game.
$("#battle-button").on("click", function(event){
    event.preventDefault();
    $("#battle-home").hide();
    $("#battleBox").show();
    $(".battle-arena").show();
    $(".battle-arena-moves").show();
    $(".battle-text").hide();   
    
    if (wildPokemon.length === 0){
        console.log("test")
        window.location.replace("https://tyrannofloresrex.github.io/PokeBatEx/index.html");

    }

    //checks if picked pokemon has a value, if it doesn't it will spawn a random pokemon or it will spawn the value pokemon
    if (pickedPokemon === -1)
    {
        window.location.replace("https://tyrannofloresrex.github.io/PokeBatEx/gallery.html");
    } else if (pickedPokemon === 0){
        getUserPokeAPI(wildPokemon);
        getWildPokeAPI();
    } else {
        getUserPickedPokeAPI(pickedPokemon);
        getWildPokeAPI();
    }
    
});
//this is the function that loads the page making the game ready when the battle button is clicked
function loadPage(){
    
    generatePokemonAry();
    getPokemon();
    storePokemon();
    $(".battle-arena").hide();
    $(".battle-arena-moves").hide();
    $(".battle-text").hide();
    $("#endBox").hide();

}
//function that removes a variable from the wild pokemon array
function removeWildPoke(wildPokeNum){
    
    for (var i = 0; i < wildPokemon.length; i++) {
        if (wildPokemon[i] === wildPokeNum){
            wildPokemon.splice(i, 1);
        }
    }
}
//function that removes a variable from the user pokemon array
function removeUserPoke(userPokeNum){
    for (var i = 0; i < caughtPokemon.length; i++) {
        if (caughtPokemon[i] === userPokeNum){
            caughtPokemon.splice(i, 1);
        }
    }
}
//function that accesses the Poke Api to assign random pokemon to the user array
function getWildPokeAPI(){
    wildNumber = wildPokemon[Math.floor(Math.random()*wildPokemon.length)];
    console.log("test 1 " + wildNumber)
    let pokeAPI = `https://pokeapi.co/api/v2/pokemon/${wildNumber}/`
    console.log(wildPokemon)
    console.log("test 2 " + pokeAPI)
    removeWildPoke(wildNumber);
    storePokemon();
    getPokemon();
    $.ajax({
        url: pokeAPI,
        method: "GET"
    }).then(function(response) {
        // console.log(response)
        wildPokeName = response.name;
        var allWildMoves = response.moves;
        var randomMove1 = Math.floor(Math.random()*allWildMoves.length);
        var randomMove2 = Math.floor(Math.random()*allWildMoves.length);
        var randomMove3 = Math.floor(Math.random()*allWildMoves.length);
        var randomMove4 = Math.floor(Math.random()*allWildMoves.length);
        wildMoveName1 = response.moves[randomMove1].move.name;
        wildMoveName2 = response.moves[randomMove2].move.name;
        wildMoveName3 = response.moves[randomMove3].move.name;
        wildMoveName4 = response.moves[randomMove4].move.name;
        allWildMoveNames = [wildMoveName1, wildMoveName2, wildMoveName3, wildMoveName4]
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
//function that retrieves the typing from the move api 
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
//function that retrieves the typing from the move api 
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
//function that retrieves the typing from the move api 
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
//function that retrieves the typing from the move api 
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
//function that calls upon the poke api depending on the variable of picked pokemon
function getUserPickedPokeAPI(pokemon){
    let pokeAPI = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
    $.ajax({
        url: pokeAPI,
        method: "GET"
    }).then(function(response) {
        
        userPokeName = response.name;
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
//function that regenerates the moves based off of the move object. 
function regenUserPokeMoves(pokemon){
    let pokeAPI = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
    $.ajax({
        url: pokeAPI,
        method: "GET"
    }).then(function(response) {
        
        var allUserMoves = response.moves;
        var randomMove1 = Math.floor(Math.random()*allUserMoves.length);
        var randomMove2 = Math.floor(Math.random()*allUserMoves.length);
        var randomMove3 = Math.floor(Math.random()*allUserMoves.length);
        var randomMove4 = Math.floor(Math.random()*allUserMoves.length);
        moveName1 = response.moves[randomMove1].move.name;
        moveName2 = response.moves[randomMove2].move.name;
        moveName3 = response.moves[randomMove3].move.name;
        moveName4 = response.moves[randomMove4].move.name;
        generateMoves();
        getUserPokeType1();
        getUserPokeType2();
        getUserPokeType3();
        getUserPokeType4();
        
    })
}

//Function that accesses the Poke Api to assign random pokemon to the user array
function getUserPokeAPI(pokemon){
    var userNumber = pokemon[Math.floor(Math.random()*pokemon.length)];
    console.log("user pokemon test " + userNumber)
    localStorage.setItem('picked pokemon', JSON.stringify(userNumber));
    console.log(userNumber)
    caughtPokemon.push(userNumber);
    console.log(caughtPokemon);
    let pokeAPI = `https://pokeapi.co/api/v2/pokemon/${userNumber}/`
    removeWildPoke(userNumber);
    storePokemon();
    getPokemon();
    $.ajax({
        url: pokeAPI,
        method: "GET"
    }).then(function(response) {
        
        userPokeName = response.name;
        allUserMoves = response.moves;
        randomMove1 = Math.floor(Math.random()*allUserMoves.length);
        randomMove2 = Math.floor(Math.random()*allUserMoves.length);
        randomMove3 = Math.floor(Math.random()*allUserMoves.length);
        randomMove4 = Math.floor(Math.random()*allUserMoves.length);
        moveName1 = response.moves[randomMove1].move.name;
        moveName2 = response.moves[randomMove2].move.name;
        moveName3 = response.moves[randomMove3].move.name;
        moveName4 = response.moves[randomMove4].move.name;
        
        response.types.forEach(element => userPokemonType.push(element.type.name))
        userPokemonSprite = response.sprites.back_default;
        generatePokemonUser();
        getUserPokeType1();
        getUserPokeType2();
        getUserPokeType3();
        getUserPokeType4();
        generateMoves();

    })
}

//function that retrieves the typing from the move api 
function getUserPokeType1(){
    var pokeMoveType1 = moveName1
    let moveAPI = `https://pokeapi.co/api/v2/move/${pokeMoveType1}/`;
    console.log(moveAPI);
    $.ajax({
        url: moveAPI,
        method: "GET"
    }).then(function(value) {
        moveType1 = value.type.name;
        $("#move1").css('background-color',`${pokeColor[moveType1]}`);
    })
}
//function that retrieves the typing from the move api 
function getUserPokeType2(){
    var pokeMoveType2 = moveName2
    let moveAPI = `https://pokeapi.co/api/v2/move/${pokeMoveType2}/`;
    $.ajax({
        url: moveAPI,
        method: "GET"
    }).then(function(value) {
        moveType2 = value.type.name;
        $("#move2").css('background-color',`${pokeColor[moveType2]}`);
    })
}
//function that retrieves the typing from the move api 
function getUserPokeType3(){
    var pokeMoveType3 = moveName3
    let moveAPI = `https://pokeapi.co/api/v2/move/${pokeMoveType3}/`;
    $.ajax({
        url: moveAPI,
        method: "GET"
    }).then(function(value) {
        moveType3 = value.type.name;
        $("#move3").css('background-color',`${pokeColor[moveType3]}`);
    })
}
//function that retrieves the typing from the move api 
function getUserPokeType4(){
    var pokeMoveType4 = moveName4
    let moveAPI = `https://pokeapi.co/api/v2/move/${pokeMoveType4}/`;
    $.ajax({
        url: moveAPI,
        method: "GET"
    }).then(function(value) {
        moveType4 = value.type.name;
        $("#move4").css('background-color',`${pokeColor[moveType4]}`);
        
    })
}
//generates the pokemon array that holds a number from 1 - 898 that equates to the pokedex
function generatePokemonAry(){
    wildPokemon = []

    for (let i = 1; i < 650; i++) {
        wildPokemon.push(i);
        
    }
    return wildPokemon;
    
}
//function that stores the wild pokemon array and caught pokemon array to local storage
function storePokemon(){
    
    localStorage.setItem('wild pokemon', JSON.stringify(wildPokemon));
    localStorage.setItem('caught pokemon', JSON.stringify(caughtPokemon));
}
//function that retrieves wild pokemon, caught pokemon and picked pokemon from storage 
function getPokemon(){
    var storedPickedPokemon = JSON.parse(localStorage.getItem("picked pokemon"));
    var storedWildPokemon = JSON.parse(localStorage.getItem("wild pokemon"));
    var storedCaughtPokemon = JSON.parse(localStorage.getItem("caught pokemon"));

    if (storedCaughtPokemon !==null){
        
        wildPokemon = storedWildPokemon;
        caughtPokemon = storedCaughtPokemon;
    }

    if (storedPickedPokemon !== null){
        pickedPokemon = storedPickedPokemon; 
    }
}


//function that accesses the Poke Api to assign random pokemon to the opponent 
function generateWildPokemon(){
    var wildPokemonImg = $("<img>")
    wildPokemonImg.attr("src", wildPokemonSprite)
    wildPokemonImg.height(150).width(150);
    $("#wild-pokemon").append(wildPokemonImg)
    $("#wild-name").text(wildPokeName);
}

//function that uses the assigned pokemon to append the sprite and move buttons to the battle-win.html
function generatePokemonUser(){
    var userPokemonImg = $("<img>")
    userPokemonImg.attr("src", userPokemonSprite)
    userPokemonImg.height(150).width(150);
    $("#user-pokemon").append(userPokemonImg)
    $("#user-name").text(userPokeName);
}

//function that uses 4 random moves from the opponent pokemon to interact with the user
function generateMoves(){
    
    $("#move1").text(moveName1)
    $("#move2").text(moveName2)
    $("#move3").text(moveName3)
    $("#move4").text(moveName4)
}
//function that appends the battle text to the screen if it is super effective
function genBattSuperEffective(pokeName, moveName){
    pokemonName = pokeName;
    pokeMoveName = moveName;
    $(".battle-text").show();  
    setTimeout(function(){
    $(".battle-text").append($(`<span> ${pokemonName} </span>`))
    }, 50); 
    setTimeout(function(){
    $(".battle-text").append($(`<span> used </span>`))
    }, 100);
    setTimeout(function(){
    $(".battle-text").append($(`<span> ${pokeMoveName}! </span>`))
    }, 150);
    setTimeout(function(){
    $(".battle-text").append($(`<span> It </span>`))
    }, 200);
    setTimeout(function(){
    $(".battle-text").append($(`<span> was </span>`))
    }, 250);
    setTimeout(function(){
    $(".battle-text").append($(`<span> super </span>`))
    }, 300);
    setTimeout(function(){
    $(".battle-text").append($(`<span> effective! </span>`))
    }, 350);
    setTimeout(function(){
        $(".battle-text").hide();  
    }, 2000);
}
//function that appends the battle text to the screen if it is effective
function genBattEffective(pokeName, moveName){
    pokemonName = pokeName;
    pokeMoveName = moveName;
    $(".battle-text").show();  
    setTimeout(function(){
    $(".battle-text").append($(`<span> ${pokemonName} </span>`))
    }, 50);
    setTimeout(function(){
    $(".battle-text").append($(`<span> used </span>`))
    }, 100);
    setTimeout(function(){
    $(".battle-text").append($(`<span> ${pokeMoveName}! </span>`))
    }, 150);
    setTimeout(function(){
    $(".battle-text").append($(`<span> It </span>`))
    }, 200);
    setTimeout(function(){
    $(".battle-text").append($(`<span> was </span>`))
    }, 250);
    setTimeout(function(){
    $(".battle-text").append($(`<span> effective! </span>`))
    }, 300);
    setTimeout(function(){
        $(".battle-text").hide();  
    }, 2000);
}
//function that appends the battle text to the screen if it is non effective
function genBattNonEffective(pokeName, moveName){
    pokemonName = pokeName;
    pokeMoveName = moveName;
    $(".battle-text").show();  
    setTimeout(function(){
    $(".battle-text").append($(`<span> ${pokemonName} </span>`))
    }, 50);
    setTimeout(function(){
    $(".battle-text").append($(`<span> used </span>`))
    }, 100);
    setTimeout(function(){
    $(".battle-text").append($(`<span> ${pokeMoveName}! </span>`))
    }, 150);
    setTimeout(function(){
    $(".battle-text").append($(`<span> It </span>`))
    }, 200);
    setTimeout(function(){
    $(".battle-text").append($(`<span> was </span>`))
    }, 250);
    setTimeout(function(){
    $(".battle-text").append($(`<span> not </span>`))
    }, 300);  
    setTimeout(function(){  
    $(".battle-text").append($(`<span> very </span>`))
    }, 350);
    setTimeout(function(){
    $(".battle-text").append($(`<span> effective! </span>`))
    }, 400);
    setTimeout(function(){
        $(".battle-text").hide();  
    }, 2000);
}
//function that uses various wild pokemon functions to complete the computers turn
function wildTurn(){
    var randomNum = Math.floor(Math.random()*4);
    
    console.log(wildMoves)
    var randomWildMove = wildMoves[randomNum];
    var randomWildMoveName = allWildMoveNames[randomNum];
    
    console.log(randomWildMove)
    setTimeout(function(){
        getDamageWild(randomWildMove)
        wildButtonText(wildPokeName, randomWildMoveName);
        enableMoves();
        checkHealth();
    }, 2000);

    
}
//function that retrieves the information of type advantage 
function getDamageUser(userMove, userMoveName){
    damage = 10;
    for (var i = 0; i < wildPokemonType.length; i++) {
            var multiplier = pokeTypesEffect[userMove][pokeTypes[wildPokemonType[i]]]
            damage = damage * multiplier;
            
    }
    console.log(damage)
    $(".battle-text").empty();
    if (damage > 10){
        genBattSuperEffective(userPokeName, userMoveName);
    }else if (damage < 10){
        genBattNonEffective(userPokeName, userMoveName);
    }else if (damage = 10){
        genBattEffective(userPokeName, userMoveName);
    }

    wildHealth = wildHealth - damage;
    $("#wild-health").val(wildHealth);
    disableMoves();
}
//function that gets the type advantage for wild pokemon
function getDamageWild(wildMove){
    damage = 10;
    for (var i = 0; i < wildPokemonType.length; i++) {
        var multiplier = pokeTypesEffect[wildMove][pokeTypes[wildPokemonType[i]]]
        damage = damage * multiplier;
    }
    userHealth = userHealth - damage;
    $("#user-health").val(userHealth);
}
//function that appends the battle text when it is the wild pokemon's turn
function wildButtonText(wildPokemonName, wildMoveName){
    $(".battle-text").empty();
    if (damage > 10){
        genBattSuperEffective(wildPokemonName, wildMoveName);
    }else if (damage < 10){
        genBattNonEffective(wildPokemonName, wildMoveName);
    }else if (damage = 10){
        genBattEffective(wildPokemonName, wildMoveName);
    }
}
//function that disables the move buttons after you use one
function disableMoves(){
    $("#move1").attr('disabled', true);
    $("#move2").attr('disabled', true);
    $("#move3").attr('disabled', true);
    $("#move4").attr('disabled', true);
}
//function that enables the move buttons after the wild pokemon
function enableMoves(){
    $("#move1").attr('disabled', false);
    $("#move2").attr('disabled', false);
    $("#move3").attr('disabled', false);
    $("#move4").attr('disabled', false);
}
//function that shows text when you are defeated
function showDefeat(){
    
    $("#battle-home").hide();
    $(".battle-arena").hide();
    $(".battle-arena-moves").hide();
    $(".battle-text").hide();
    $("#endBox").show();     
    $(".end-text").append($(`<span> ${userPokeName} is unable to battle, and ran off back into the wild! </span>`))
}
//function that shows text when you catch a pokemon 
function showVictory(){
    $("#battle-home").hide();
    $(".battle-arena").hide();
    $(".battle-arena-moves").hide();
    $(".battle-text").hide(); 
    $("#endBox").show(); 
    $(".end-text").append($(`<span> Congratulation! You caught ${wildPokeName}! </span>`))
}
//function that determines if the user health is 0 sending the user back to the main page or if the wild health is 0 sending the user to gallery page
function checkHealth(){
    if(userHealth <= 0){
        getPokemon();
        removeUserPoke(pickedPokemon);
        wildPokemon.push(pickedPokemon);
        wildPokemon.push(wildNumber);
        storePokemon();
        pickedPokemon = 0;
        localStorage.setItem('picked pokemon', JSON.parse(pickedPokemon));
        showDefeat();
        setTimeout(function(){
        window.location.replace("https://tyrannofloresrex.github.io/PokeBatEx/index.html");
        }, 1500)
    }else if(wildHealth <= 0){
        caughtPokemon.push(wildNumber);
        storePokemon();
        showVictory();
        setTimeout(function(){
        window.location.replace("https://tyrannofloresrex.github.io/PokeBatEx/gallery.html");
        }, 1500)
    }
}


// battle sequence function that is the core of the app that pulls from other functions

//onclicks for move buttons 1-4 that will do damage based off of the typing
$("#move1").on("click", function(event){
    event.preventDefault();
    getDamageUser(moveType1, moveName1);
    checkHealth()
    wildTurn();
    regenUserPokeMoves(pickedPokemon)
        
  
    // console.log(moveType1);
    // console.log(wildPokemonType[0])
    // console.log(pokeTypesEffect[moveType1][pokeTypes[wildPokemonType[0]]])
    // console.log(pokeTypes[wildPokemonType[0]])
});

$("#move2").on("click", function(event){
    event.preventDefault();
    // console.log(moveType2);
    getDamageUser(moveType2, moveName2);
    checkHealth()
    wildTurn();
    regenUserPokeMoves(pickedPokemon)
    
});

$("#move3").on("click", function(event){
    event.preventDefault();
    // console.log(moveType3);
    getDamageUser(moveType3, moveName3);
    checkHealth()
    wildTurn();
    regenUserPokeMoves(pickedPokemon)
});

$("#move4").on("click", function(event){
    event.preventDefault();
    console.log(moveType4);
    getDamageUser(moveType4, moveName4);
    checkHealth()
    wildTurn();
    regenUserPokeMoves(pickedPokemon)
});




