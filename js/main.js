$(document).ready(function() {
  console.log("HELLO!");
  getLocation();

  $('#zip-get-weather').on('click', function(e) {
    e.preventDefault();
    console.log('Testing')
    var zipcode = $('#zipcode').val();
    console.log('Zipcode is ' + zipcode);
    $.ajax({
      url: "http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode +",us,&APPID=d989efa9b6afbb8803d408c2a7168b59",
      type: 'GET',
      dataType: 'json',
    }).done(function(response) {
      console.log('success', response);
      var fahrenheit = conversions.fahrenheit(response.main.temp);
      getWeather(fahrenheit, response.name);
    }).fail(function() {
      console.log('failed ', response);
    });
  })
});

var getWeather = function(temp, city) {
  $('#instructions').hide();
  $('#temp').empty();
  $('#city').empty();
  $('#temp').append(temp + " F");
  $('#city').append(city);
};

var conversions = (function() {
  var fahrenheit = function(kelvin) {
    var kToFConversion = ((kelvin - 273.15) * 1.8 + 32);
    console.log('Converting ' + kelvin + ' Kelvin to ' + kToFConversion + ' Fahrenheit');
    return (Math.floor((kelvin - 273.15) * 1.8 + 32));
  }
  return {
    fahrenheit: fahrenheit
  }
})()

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude);
    console.log("Longitude: " + position.coords.longitude);
}