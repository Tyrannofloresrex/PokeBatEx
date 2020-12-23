var $cardNum = $("#card-search").val().trim();
console.log($cardNum)
var $searchButton = $("#search-button");

$searchButton.click(function (event) {
  var $cardNum = $("#card-search").val().trim();
  var queryURL = `https://api.pokemontcg.io/v1/cards?nationalPokedexNumber=${$cardNum}`;

  event.preventDefault()
  console.log(queryURL)
  
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (data) {
    console.log(data);
  
    var apiImage = $("<img>")
    apiImage.attr("src", data.cards[1].imageUrl);
    $(".gallery").append(apiImage)
   
   forEach() // $(".gallery").prepend($("<img>", {id:'$cardName', src: "data.cards[1].imageUrl"}));
});
  
})
