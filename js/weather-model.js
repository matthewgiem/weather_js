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
