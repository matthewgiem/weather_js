(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "80f7956d7ddf0a2fd5eafec8fda0b72e"

},{}],2:[function(require,module,exports){
function Weather(kelvin){
  this.kelvin = kelvin;
}

Weather.prototype.toFarenheight = function(city) {
  return ((this.kelvin - 273) * 9 / 5 + 32);
};

Weather.prototype.toCelcius = function(city) {
  return (this.kelvin - 273);
};
// function temperature(kelvin)  {
//   return (kelvin - 273) * 9 / 5 + 32;
// }

exports.weatherModule = Weather;

},{}],3:[function(require,module,exports){
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

},{"./../.env":1,"./../js/weather-model.js":2}]},{},[3]);
