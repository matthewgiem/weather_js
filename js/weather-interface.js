var Weather = require('./../js/weather-model.js').weatherModule;

var apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    var city = $('#location').val();
    var convert = $('#type').val("");
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {
      var temperature = new Weather(response.main.temp);
      if (convert === "farenheight") {
        $('.showWeather').text("The temperature in " + city + " is " + (temperature.toFarenheight()) + "degrees farenheight");
      } else {
        $('.showWeather').text("The temperature in " + city + " is " + (temperature.toCelcius()) + "degrees celcius");
      }
    });
  });
  $('#compare_location').click(function() {
    var city1 = $('#location').val();
    var city2 = $('#compare_location').val();
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city1 + '&appid=' + apiKey).then(function(response) {
      var temp1 = new Weather(response.main.temp);
      $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city2 + '&appid=' + apiKey).then(function(response) {
        var temp2 = new Weather(response.main.temp);
        $('.showWeather').text("The difference in temperature in " + city1 + " to " + city2 + " is " + (temp1.toFarenheight() - temp2.toFarenheight()) + "degrees farenheight");
      });
    });
  });
});
