var mobileMenuBtn = document.querySelector('.burger');
var mobileMenuCloseBtn = document.querySelector('.close');
var menuLinks = document.querySelector('.menu-links');
var cityName = document.querySelector('span')
var searchBtn = document.querySelector('.search-button');
var searchInput = document.querySelector('.search-input');
var homeBtn = document.querySelector('.btn');
var homeInput = document.querySelector('#text');
var homeSearchInput;
homeBtn.addEventListener('click', function(event) {
    event.preventDefault();

    window.location.href='barlistings.html'
    homeSearchInput = homeInput.value
    getLocation(homeSearchInput); 
   // document.location.href ='.html';
});

// Event Listeners for Hamburger Menu
mobileMenuBtn.addEventListener('click', function() {
    menuLinks.classList.add('active');
});

mobileMenuCloseBtn.addEventListener('click', function() {
    menuLinks.classList.remove('active');
    
})

// Retrieving bar information according to user criteria from Google API
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

                    function renderDetails(i) {
                        var getMoreBarInfo = 'https://cors.bridged.cc/https://maps.googleapis.com/maps/api/place/details/json?place_id=' + bars.results[i].place_id + '&fields=formatted_phone_number,opening_hours,website&key=AIzaSyBZy_-Hm-NJBX4uoI3-evIuIKorhTOeQJ8' 
        
                        fetch(getMoreBarInfo)
                            .then(function(response){
                                return response.json();
                            })
                            .then(function (info) {
                                console.log(info)
                                var barListings = document.querySelector('.bar-listings')
                                // Creating a container to hold bar results in
                                var barResultContainer = document.createElement('div')
                                barResultContainer.classList.add('bar-container')
                                barListings.append(barResultContainer)
                                
                                //Creating a container to hold bar image within results container
                                var barImage = document.createElement('div')
                                barImage.classList.add('bar-image')
                                barResultContainer.append(barImage)
                                barImage.innerHTML = '<img class="image-style" src="' + 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&maxheight=300&photoreference=' + bars.results[i].photos[0].photo_reference + '&key=AIzaSyBZy_-Hm-NJBX4uoI3-evIuIKorhTOeQJ8" alt="bar image">'
                                
                                //Creating a container to hold bar information within results container
                                var barInfo = document.createElement('div')
                                barInfo.classList.add('bar-info')
                                barResultContainer.append(barInfo)
                                barInfo.innerHTML = '<ul class="bar-details">' + '<li>' + 'Bar Name: ' + bars.results[i].name + '</li>' + '<li>' + 'Address: ' + bars.results[i].vicinity + '</li>' + '</ul>'

                                if(info.result.formatted_phone_number) {
                                    var phoneNum = document.createElement('li')
                                    phoneNum.classList.add('bar-phone')
                                    barInfo.append(phoneNum)
                                    phoneNum.innerHTML = 'Phone Number: ' + '<a href="tel:' + info.result.formatted_phone_number + '">' + info.result.formatted_phone_number + '</a>'
                                } else {
                                    var phoneNum = document.createElement('li')
                                    phoneNum.classList.add('bar-phone')
                                    barInfo.append(phoneNum)
                                    phoneNum.innerHTML = 'Phone Number: UNAVAILABLE'
                                }
                                
                                //Event Listener to move down to the map when user clicks on the bar result container
                                barResultContainer.addEventListener('click', function(){
                                    document.getElementById('map').scrollIntoView({
                                        behavior: 'smooth'
                                    });
                                })
                            })
                    }

                    //Creating Map with markers according to user inputted criteria and the surrounding bars to that location
                    for(var i = 0; i < bars.results.length; i++){
                        renderDetails(i)

                        new google.maps.Marker({
                            map,
                            title: bars.results[i].name,
                            position: bars.results[i].geometry.location
                          });
                    }

                        var location = {lat: city.candidates[0].geometry.location.lat, lng: city.candidates[0].geometry.location.lng};

                        map.panTo(location)
                        


                })
            
        })
    
};

var map;
var mapEl = document.getElementById('map')

function initMap () {
    map = new google.maps.Map(mapEl, {
        zoom: 15,
    });
}


searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    var userInput = searchInput.value
    console.log(userInput);
    getLocation(userInput);
    mapEl.style.display = 'block';
    
});

