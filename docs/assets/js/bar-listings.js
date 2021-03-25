var mobileMenuBtn = document.querySelector('.burger');
var mobileMenuCloseBtn = document.querySelector('.close');
var menuLinks = document.querySelector('.menu-links');
var cityName = document.querySelector('span')
var searchBtn = document.querySelector('.search-button');
var searchInput = document.querySelector('.search-input');

mobileMenuBtn.addEventListener('click', function() {
    menuLinks.classList.add('active');
});

mobileMenuCloseBtn.addEventListener('click', function() {
    menuLinks.classList.remove('active');
    
})

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}


var getLocation = function (userInput) {
    var placesUrl = 'https://cors.bridged.cc/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + userInput + '&inputtype=textquery&fields=name,geometry&key=AIzaSyBZy_-Hm-NJBX4uoI3-evIuIKorhTOeQJ8'

    fetch(placesUrl)
        .then(function (response){
            return response.json();
        })
        .then(function (city) {
            console.log(city)
            cityName.textContent = city.candidates[0].name

            var barsUrl = 'https://cors.bridged.cc/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + city.candidates[0].geometry.location.lat + ',' + city.candidates[0].geometry.location.lng + '&radius=1500&type=bar&key=AIzaSyBZy_-Hm-NJBX4uoI3-evIuIKorhTOeQJ8'
                   
            fetch(barsUrl)
                .then(function (response){
                    return response.json();
                })
                .then(function (bars){
                    console.log(bars)

                    for(var i = 0; i < bars.results.length; i++){
                        var barListings = document.querySelector('.bar-listings')
                        // Creating a container to hold results
                        var barResultContainer = document.createElement('div')
                        barResultContainer.classList.add('bar-container')
                        barListings.append(barResultContainer)
                        
                        //Creating a container to hold image within results container
                        var barImage = document.createElement('div')
                        barImage.classList.add('bar-image')
                        barResultContainer.append(barImage)
                        barImage.innerHTML = '<img src="' + 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&photoreference=' + bars.results[i].photos[0].photo_reference + '&key=AIzaSyBZy_-Hm-NJBX4uoI3-evIuIKorhTOeQJ8" alt="bar image">'
                        
                        //Creating a container to hold bar information within results container
                        var barInfo = document.createElement('div')
                        barInfo.classList.add('bar-info')
                        barResultContainer.append(barInfo)
                        barInfo.innerHTML = '<ul class="bar-details">' + '<li>' + 'Bar Name: ' + bars.results[i].name + '</li>' + '<li>' + 'Address: ' + bars.results[i].vicinity+ '</li>' + '</ul>'


                        var getMoreBarInfo = 'https://cors.bridged.cc/https://maps.googleapis.com/maps/api/place/details/json?place_id=' + bars.results[i].place_id + '&fields=formatted_phone_number,opening_hours,website&key=AIzaSyBZy_-Hm-NJBX4uoI3-evIuIKorhTOeQJ8' 

                        fetch(getMoreBarInfo)
                            .then(function(response){
                                return response.json();
                            })
                            .then(function (info) {
                                console.log(info)
                                for(i = 0; i < bars.results[i].length; i++)
                                var barInfoEl = document.querySelector('.bar-info')
                                var phoneNum = document.createElement('div')
                                barInfoEl.append(phoneNum)
                                phoneNum.textContent = 'Phone Number: ' + info.result.formatted_phone_number
                            })
                    }

                    // function initMap() {
                    //     var location = {lat: city.candidates[0].geometry.location.lat, lng: city.candidates[0].geometry.location.lng};
                    //     var map = new google.maps.Map(document.getElementById('map'), {
                    //         zoom: 15,
                    //         center: location
                    //     });
                        
                    // }
                })
        })
    
};


let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}



searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    var userInput = searchInput.value
    console.log(userInput);
    getLocation(userInput);
});