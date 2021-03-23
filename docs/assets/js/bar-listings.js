var mobileMenuBtn = document.querySelector('.burger');
var mobileMenuCloseBtn = document.querySelector('.close');
var menuLinks = document.querySelector('.menu-links');
var searchBtn = document.querySelector('.search-button');
var searchInput = document.querySelector('.search-input');

mobileMenuBtn.addEventListener('click', function() {
    menuLinks.style.transform = 'translateX(0)';
});

mobileMenuCloseBtn.addEventListener('click', function() {
    menuLinks.style.transform = 'translateX(100%)'
})


var getBarInfo = function (userInput) {
    var placesUrl = 'https://cors.bridged.cc/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + userInput + ' bars&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyBZy_-Hm-NJBX4uoI3-evIuIKorhTOeQJ8'

    fetch(placesUrl)
        .then(function (response){
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        })

};

searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    var userInput = searchInput.value
    console.log(userInput)
    getBarInfo(userInput)
});