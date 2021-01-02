// pokeNums corresponds to the pokedex value saved from the Battle.html
var pokeNums = JSON.parse(localStorage.getItem("caught pokemon"));
var $gallery = $(".gallery");
var cachedImages = JSON.parse(localStorage.getItem("cachedImages")) || [];
var $clearButton = $("#clear-button");


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

      apiImage.attr("src", data.cards[1].imageUrl);
      $(".gallery").append(apiImage);
      // cardNum is  the pokedex number and acts as a key that corresponds to the value, which is the image url.
      cachedImages[cardNum] = data.cards[1].imageUrl;
      localStorage.setItem("cachedImages", JSON.stringify(cachedImages));
    });
  } else {
    // If the cardNum is already stored, an image tag is created and it's attributes come from localstorage and is appended to gallery.
    var caughtImage = $("<img>");
    caughtImage.attr("src", (cachedImages[cardNum]));
    $(".gallery").append(caughtImage);

  }
}

$clearButton.click(function () {
  alert("Are you sure you want to clear");
  localStorage.clear();
});

// var pokemonObject = {
//   imgURL: data.cards[1].imageUrl,
//   pokedexNum: data.cards[1].nationalPokedexNumber

// }
