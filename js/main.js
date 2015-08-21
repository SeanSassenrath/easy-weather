$(document).ready(function() {
  console.log("HELLO!");
  getLocation();

  $('#get-zip-weather').on('click', function(e) {
    e.preventDefault();
    var zipcode = $('#zipcode').val();
    console.log('Zipcode is ' + zipcode);
    getZipWeather(zipcode);
  });

  var getZipWeather = function(zipcode) {
    $.ajax({
      url: "http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode +",us,&APPID=d989efa9b6afbb8803d408c2a7168b59",
      type: 'GET',
      dataType: 'json',
    }).done(function(response) {
      console.log('success', response);
      var fahrenheit = conversions.fahrenheit(response.main.temp);
      appendWeather(fahrenheit, response.name);
    }).fail(function() {
      console.log('failed ', response);
    });
  };

  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(locationWeather);
      } else {
          console.log("Geolocation is not supported by this browser.");
      }
  }

  function locationWeather(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    $.ajax({
      url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lat +"&lon=" + lon +"&APPID=d989efa9b6afbb8803d408c2a7168b59",
      type: 'GET',
      dataType: 'json',
    }).done(function(response) {
      console.log('success', response);
      var fahrenheit = conversions.fahrenheit(response.main.temp);
      appendWeather(fahrenheit, response.name);
    }).fail(function() {
      console.log('failed ', response);
    });
  };

  var appendWeather = function(temp, city) {
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

});