var mobileMenuBtn = document.querySelector('.burger');
var mobileMenuCloseBtn = document.querySelector('.close');
var menuLinks = document.querySelector('.menu-links');
var barSearchForm = document.querySelector('.bar-search');
var searchBtn = document.querySelector('.search-button');
var searchInput = document.querySelector('.search-input');

mobileMenuBtn.addEventListener('click', function() {
    menuLinks.style.transform = 'translateX(0)';
});

mobileMenuCloseBtn.addEventListener('click', function() {
    menuLinks.style.transform = 'translateX(100%)'
})


var getBarInfo = function (userInput) {
    var placesUrl = 
    fetch(placesUrl)
        .then(function (response){
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        })

};

barSearchForm.addEventListener('click', function(event){
    event.preventDefault();
    var userInput = searchInput.value
    console.log(userInput)
    getBarInfo(userInput)
});