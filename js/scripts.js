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

function loadWeather(cityCoords) {

    var latlng = cityCoords.coords.latitude + ',' + cityCoords.coords.longitude, 
        forecastURL = 'https://api.forecast.io/forecast/c6b388b3d3aa5d72a41c29095149cacf/' + latlng;

    $.ajax({
        url: forecastURL,
        jsonPCallback: 'jsonCallback',
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function(json) {
            
            // Current Temp
            $('#currentTemp').html(Math.round(json.currently.temperature) + '&#186;F');
            
            // Current Icon
            $('#currentTemp').attr('data-icon', weatherIcons[json.currently.icon]);

            // Current Summary
            $('#currentSummary').html(json.currently.summary);

            if  (json.currently.icon == 'rain') {
                $('#currentRain').html('Yes!')
            } else {
                $('#currentRain').html('No!')
            }
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