
//Setup variables for the attributes in the URL to make API calls 
var baseURL = 'https://newsapi.org/v2/top-headlines?';
var countryURL = 'country=';
var category_1 = 'category=technology';
var category_2 = 'category=entertainment';
var category_3 = 'category=health';
var apiKey = 'apiKey=08fb3efa118449ef9d06e2e17f382f8d';
var and = '&';

//Storing array of id's from HTML elements for later reference
var idImg_1 = ["r1c1Img", "r1c2Img", "r1c3Img", "r1c4Img"];
var idTitle_1 = ["r1c1Title", "r1c2Title", "r1c3Title", "r1c4Title"];
var idDesc_1 = ["r1c1Desc", "r1c2Desc", "r1c3Desc", "r1c4Desc"];
var idLink_1 = ["r1c1Link", "r1c2Link", "r1c3Link", "r1c4Link"];

var idImg_2 = ["r2c1Img", "r2c2Img", "r2c3Img", "r2c4Img"];
var idTitle_2 = ["r2c1Title", "r2c2Title", "r2c3Title", "r2c4Title"];
var idDesc_2 = ["r2c1Desc", "r2c2Desc", "r2c3Desc", "r2c4Desc"];
var idLink_2 = ["r2c1Link", "r2c2Link", "r2c3Link", "r2c4Link"];

var idImg_3 = ["r3c1Img", "r3c2Img", "r3c3Img", "r3c4Img"];
var idTitle_3 = ["r3c1Title", "r3c2Title", "r3c3Title", "r3c4Title"];
var idDesc_3 = ["r3c1Desc", "r3c2Desc", "r3c3Desc", "r3c4Desc"];
var idLink_3 = ["r3c1Link", "r3c2Link", "r3c3Link", "r3c4Link"];


//Default page (Landing page)
//Using ES6 module to generate the content only once when the page is loaded 
(function(){
	
	//Getting the country code from loaded images
	var country = document.getElementById("country1");
	let unnecessary1 = 'http://localhost:3000/imgs/flags/';
	let unnecessary2 = '.png';
	let countryCode = country.src.replace(unnecessary1, '');
	countryCode = countryCode.replace(unnecessary2, '');

	
	//URLs created using specific categories
	var URL_1 = baseURL + countryURL + countryCode + and + category_1 + and + apiKey;
	var URL_2 = baseURL + countryURL + countryCode + and + category_2 + and + apiKey;
	var URL_3 = baseURL + countryURL + countryCode + and + category_3 + and + apiKey;

	//URLs are parsed one after another (chained) in order to wait till the requests are complete and move to another URL
	//Fetching json data synchronously by parsing the above URLs
	//Callbacks are used to maintain synchronicity
	fetchURLFunction(URL_1, idImg_1, idTitle_1, idDesc_1, idLink_1, fetchURLFunction(URL_2, idImg_2, idTitle_2, idDesc_2, idLink_2, fetchURLFunction(URL_3, idImg_3, idTitle_3, idDesc_3, idLink_3)));

}());


//When any of the country in the main page is clicked

let countries = document.getElementById('countries');

//An eventlistener will identify and show the data specific to the clicked country 
countries.addEventListener("click", function(e) {
	//Get the country code of the clicked country 
    let country = document.getElementById(e.target.id);
	let unnecessary1 = 'http://localhost:3000/imgs/flags/';
	let unnecessary2 = '.png';
	let countryCode = country.src.replace(unnecessary1, '');
	countryCode = countryCode.replace(unnecessary2, '');

	//URLs created using specific categories
	var URL_1 = baseURL + countryURL + countryCode + and + category_1 + and + apiKey;
	var URL_2 = baseURL + countryURL + countryCode + and + category_2 + and + apiKey;
	var URL_3 = baseURL + countryURL + countryCode + and + category_3 + and + apiKey;

	//URLs are parsed one after another (chained) in order to wait till the requests are complete and move to another URL
	//Fetching json data synchronously by parsing the above URLs
	//Callbacks are used to maintain synchronicity
	fetchURLFunction(URL_1, idImg_1, idTitle_1, idDesc_1, idLink_1, fetchURLFunction(URL_2, idImg_2, idTitle_2, idDesc_2, idLink_2, fetchURLFunction(URL_3, idImg_3, idTitle_3, idDesc_3, idLink_3)));


});


//A function is created to reuse while parsing different URLs 
//Callback is used to run the function and fetch URLs one after another after completion of each API request
function fetchURLFunction(URL, idImg, idTitle, idDesc, idLink, callback){
	fetch(URL)
	.then(function(response){
		return response.json();
	})
	.then(function(data){
		for (var i = 0; i < 4; i++) {
			//A random number is selected from the number of articles in the country and the category
			var a = Math.round(data.articles.length * Math.random());

			//Image of the random numbered article is fetched and displayed in HTML 
			var image = document.getElementById(idImg[i]);
			image.setAttribute("src", data.articles[a].urlToImage);

			//Headline of the above fetched article is displayed in HTML
			var headline = document.getElementById(idTitle[i]);
			headline.innerHTML = data.articles[a].title;

			//Description of the above fetched article is displayed in HTML
			var desc = document.getElementById(idDesc[i]);
			desc.innerHTML = data.articles[a].description;

			//Link to the source is added to the button which directs to the the page from where the API gets the data
			var link = document.getElementById(idLink[i]);
			link.href = data.articles[a].url;
			link.innerHTML = data.articles[a].source.name;
		}
		//Callback is used to call another function after finishing the above API request. This is to maintain synchronicity
		callback();
	})
	.catch(function(resp){
		//In case the URL fails to receive data from the API calls, it sends an error message
		document.getElementById("Output").innerHTML = "There was an error";
	});
}
