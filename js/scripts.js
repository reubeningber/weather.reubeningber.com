var weatherIcons = {
    'clear-day' : 'B',
    'clear-night' : 'C',
    'rain' : 'R',
    'snow' : 'G',
    "sleet" : "X", 
    "wind" : "S", 
    "fog" :"N", 
    "cloudy" : "Y",
    "partly-cloudy-day" : "H", 
    "partly-cloudy-night" : "I"
};

var cities = {
    "new york"      :   {coords: {latitude: 40.672060, longitude:-73.983898}},
    "california"   :   {coords: {latitude: 34.101422, longitude: -118.341224}},
    "chicago"       :   {coords: {latitude: 41.879003, longitude: -87.63675}},
    "san francisco" :   {coords: {latitude: 37.788531, longitude: -122.407237}},
    "miami"         :   {coords: {latitude: 25.790176, longitude: -80.140133}},
    "current location" : ""
};

var weatherGif = {
    'clear-day' : 'images/gif/clear-day.gif',
    'clear-night' : 'images/gif/clear-night.gif',
    'rain' : 'images/gif/rain.gif'
    'snow' : 'images/gif/snow.gif',
    "sleet" : "images/gif/sleet.gif", 
    "wind" : "images/gif/wind.gif", 
    "fog" :"images/gif/fog.gif", 
    "cloudy" : "images/gif/cloudy.gif",
    "partly-cloudy-day" : "images/gif/cloudy-2.gif", 
    "partly-cloudy-night" : "images/gif/cloudy-night.gif"
};

function loadWeather(cityCoords) {

    var latlng = cityCoords.coords.latitude + ',' + cityCoords.coords.longitude, 
        forecastURL = 'https://api.forecast.io/forecast/c6b388b3d3aa5d72a41c29095149cacf/' + latlng;

    $.ajax({
        url: forecastURL,
        jsonPCallback: 'jsonCallback',
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function(json) {
            
            // Current GIF
            $('#currentGif').attr('src', weatherGif[json.currently.icon]);

            // Current Temp
            $('#currentTemp').html(Math.round(json.currently.temperature) + '&#186;F');
            
            // Current Icon
            $('#currentTemp').attr('data-icon', weatherIcons[json.currently.icon]);

            // Current Summary
            $('#currentSummary').html(json.currently.summary);



            // Check for Rain
            // if  (json.currently.icon == 'rain') {
            //     $('#currentRain').html('Yes!')
            // } else {
            //     $('#currentRain').html('No!')
            // }
        },
        error: function(e) {
            console.log(e.message);
        }
    });
}

function loadCity(city) {
    $('#currentLocation').html(city);

    if (city.toLowerCase() == 'current location') {
        if ( navigator.geolocation ) 
            navigator.geolocation.getCurrentPositon(loadWeather, loadDefaultCity);
        else {
            loadDefaultCity();
        }
    } else {
        loadWeather(cities[city.toLowerCase()]);
    };

    isItRaining(loadWeather);
}

function loadDefaultCity() {
    loadCity('New York');
}

function isItRaining(loadWeather) {

    
}


$(document).ready(function() {
    loadCity("New York");

    $("a.city").bind("click",function(){
        loadCity($(this).html());
    });
});