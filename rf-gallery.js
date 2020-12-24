var $cardNum = $("#card-search").val().trim();
console.log($cardNum)
var $searchButton = $("#search-button");
var $gallery = $(".gallery")
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
  
    // var apiImage = $("<img>")
    // apiImage.attr("src", data.cards[1].imageUrl);
    // $(".gallery").append(apiImage)
    var pokemonObject = {
      imgURL: data.cards[1].imageUrl,
      pokedexNum: data.cards[1].nationalPokedexNumber

    }
   render(data.cards[1].imageUrl, $gallery)
  
    
});

  
});

function render(imgUrlToAppend, parentElement){
  var apiImage = $("<img>")
    apiImage.attr("src", imgUrlToAppend);
    parentElement.append(apiImage)
}