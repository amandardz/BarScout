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

var getLocation = function (userInput) {
    var placesUrl = 'https://cors.bridged.cc/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + userInput + '&inputtype=textquery&fields=name,geometry&key=AIzaSyBZy_-Hm-NJBX4uoI3-evIuIKorhTOeQJ8'

    fetch(placesUrl)
        .then(function (response){
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            cityName.textContent = data.candidates[0].name

            var barsUrl = 'https://cors.bridged.cc/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + data.candidates[0].geometry.location.lat + ',' + data.candidates[0].geometry.location.lng + '&radius=1500&type=bar&key=AIzaSyBZy_-Hm-NJBX4uoI3-evIuIKorhTOeQJ8'
            
            console.log(barsUrl)
        
            fetch(barsUrl)
                .then(function (response){
                    return response.json();
                })
                .then(function (data){
                    console.log(data)

                    for(var i = 0; i < data.results.length; i++){
                        var barListings = document.querySelector('.bar-listings')
                        // Creating a container to hold results
                        var barResultContainer = document.createElement('div')
                        barResultContainer.classList.add('bar-container')
                        barListings.append(barResultContainer)
                        
                        //Creating a container to hold image within results container
                        var barImage = document.createElement('div')
                        barImage.classList.add('bar-image')
                        barResultContainer.append(barImage)
                        barImage.innerHTML = '<img src="' + 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=150&photoreference=' + data.results[i].photos[0].photo_reference + '&key=AIzaSyBZy_-Hm-NJBX4uoI3-evIuIKorhTOeQJ8" alt="bar image">'
                        
                        //Creating a container to hold bar information within results container
                        var barInfo = document.createElement('div')
                        barInfo.classList.add('bar-info')
                        barResultContainer.append(barInfo)
                        barInfo.innerHTML = '<ul class="bar-details">' + '<li>' + 'Bar Name: ' + data.results[i].name + '</li>' + '<li>' + 'Address: ' + data.results[i].vicinity+ '</li>' + '</ul>'


                        var getMoreBarInfo = 'https://cors.bridged.cc/https://maps.googleapis.com/maps/api/place/details/json?place_id=' + data.results[i].place_id + '&fields=formatted_phone_number,opening_hours,website&key=AIzaSyBZy_-Hm-NJBX4uoI3-evIuIKorhTOeQJ8' 

                        fetch(getMoreBarInfo)
                            .then(function(response){
                                return response.json();
                            })
                            .then(function (info) {
                                console.log(info)
                                for(i = 0; i < data.results[i].length; i++)
                                var barInfoListEl = document.querySelector('.bar-details')
                                var phoneNum = document.createElement('li')
                                barInfoListEl.append(phoneNum)
                                phoneNum.textContent = 'Phone Number: ' + info.result.formatted_phone_number
                            })
                    }
                })
        })
};

searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    var userInput = searchInput.value
    console.log(userInput)
    getLocation(userInput)
});