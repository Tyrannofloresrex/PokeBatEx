var $cardNum = $("#card-search").val().trim();
var $searchButton = $("#search-button");
var $gallery = $(".gallery");
var caughtCards
var $clearButton = $("#clear-button");

console.log(localStorage.getItem("caughtCards"))

if (localStorage.getItem("caughtCards") === null) {
  caughtCards = [];
} else {
  var str = localStorage.getItem("caughtCards");
  caughtCards = str.split(",")

for (let index = 0; index < caughtCards.length; index++) {
  var caughtImage = $("<img>");
  caughtImage.attr("src", localStorage.getItem(caughtCards[index]));
  $(".gallery").append(caughtImage);
}};

$searchButton.click(function (event) {
  var $cardNum = $("#card-search").val().trim();
  var queryURL = `https://api.pokemontcg.io/v1/cards?nationalPokedexNumber=${$cardNum}`;
  console.log($cardNum)
  
  event.preventDefault();
  
  $.ajax({
    url: queryURL,
    method: "GET",

  }).then(function (data) {
    console.log(data)
    
    var apiImage = $("<img>");

    apiImage.attr("src", data.cards[1].imageUrl);
    $(".gallery").append(apiImage);
    
    caughtCards.push($cardNum);
    
    localStorage.setItem($cardNum, data.cards[1].imageUrl);
    localStorage.setItem("caughtCards", caughtCards);
    console.log(caughtCards)
  });
});

// window.onload = function () {

  
$clearButton.click(function(){
  alert("Are you sure you want to clear")
  localStorage.clear()
})
;


   

// var pokemonObject = {
//   imgURL: data.cards[1].imageUrl,
//   pokedexNum: data.cards[1].nationalPokedexNumber

// }