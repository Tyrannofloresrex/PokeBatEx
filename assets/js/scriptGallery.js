// pokeNums corresponds to the pokedex value saved from the Battle.html
var pokeNums = JSON.parse(localStorage.getItem("caught pokemon"));
var $gallery = $(".gallery");
var cachedImages = JSON.parse(localStorage.getItem("cachedImages")) || [];
var $clearButton = $("#clear-button");
var pickedPokemon = []
pokeNums.sort()
// loops through pokedex numbers in storedcaughtPokemon array, fetches data from API based on number, returns URL img value and appends to page.
for (let i = 0; i < pokeNums.length; i++) {
  const cardNum = pokeNums[i];
  var queryURL = `https://api.pokemontcg.io/v1/cards?nationalPokedexNumber=${cardNum}`;
  
  // If the Pokedex number is not stored in local storage in with  the key(cardNum) and value(api img url), then it queries API and gets info.

  if (!cachedImages[cardNum]) {
    $.ajax({
      url: queryURL,
      method: "GET",  
    }).then(function (data) {
      console.log(data);
      // Creates html img element and applies the image URL to that img tag, then appends it to gallery.
      var apiImage = $("<img>");

      // $('.gallery').append(`<div><img src='${imageURL}'><span>${cadNum}</span></div>`)
  
      apiImage.attr({
       "src": data.cards[0].imageUrl,
       "cardNum": cardNum,
      //  "loading":lazy,
      });
        
      $(".gallery").append(apiImage);
      // cardNum is  the pokedex number and acts as a key that corresponds to the value, which is the image url.
      cachedImages[cardNum] = data.cards[0].imageUrl;
      localStorage.setItem("cachedImages", JSON.stringify(cachedImages));
    });
  } else {
    // If the cardNum is already stored, an image tag is created and it's attributes come from localstorage and is appended to gallery.
    var caughtImage = $("<img>");
    caughtImage.attr({
      "src": cachedImages[cardNum], 
      "cardNum": cardNum
     });
    $(".gallery").append(caughtImage);
  }
}

// targeting img elements that will be on the page at some point, changing border color to indicate selected and logging
$('.gallery').on('click','img',function(){
  console.log( $(this).attr("cardNum") )
  pickedPokemon = $(this).attr("cardNum");
  localStorage.setItem('picked pokemon', JSON.parse(pickedPokemon));
  console.log(pickedPokemon);
  $('.selectedIMG').removeClass('selectedIMG');
  $(this).addClass('selectedIMG');
  console.log( $(this).attr("cardNum"));
})

// $("home-button").click(function() {
// cachedImages.sort()
// })
$clearButton.click(function() {
  if (confirm("Are you sure you want to free all of your Pok\u00E9mon?") == true) {
    localStorage.clear();
    location.reload();
  } else {
  };
})

