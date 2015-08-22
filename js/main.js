$(document).ready(function() {
  console.log("HELLO!");
  getLocation();

  $('#zipcode').hide();
  $('#get-zip-weather').hide();

  $('#get-zip-weather').on('click', function(e) {
    e.preventDefault();
    var zipcode = $('#zipcode').val();
    console.log('Zipcode is ' + zipcode);
    getZipWeather(zipcode);
  });

   $('html, body').keypress(function (e) {
   var key = e.which;
   if(key == 13)
    {
      $("#get-zip-weather").click();
      return false;
    }
  });

  var getZipWeather = function(zipcode) {
    $.ajax({
      url: "http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode +",us,&APPID=d989efa9b6afbb8803d408c2a7168b59",
      type: 'GET',
      dataType: 'json',
    }).done(function(response) {
      console.log('success', response);
      $("html, body").animate(
        {scrollTop: "0px"}, "slow"
      );
      $('#zipcode').show();
      $('#get-zip-weather').show();
      var currentTempFahrenheit = conversions.fahrenheit(response.main.temp);
      var maxTempFahrenheit = conversions.fahrenheit(response.main.temp_max);
      var minTempFahrenheit = conversions.fahrenheit(response.main.temp_min);
      // var icon = response.weather[0].icon;
      appendWeather(currentTempFahrenheit, maxTempFahrenheit, minTempFahrenheit, response.name);
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
      $('#zipcode').show();
      $('#get-zip-weather').show();
      var currentTempFahrenheit = conversions.fahrenheit(response.main.temp);
      var maxTempFahrenheit = conversions.fahrenheit(response.main.temp_max);
      var minTempFahrenheit = conversions.fahrenheit(response.main.temp_min);
      // var icon = response.weather[0].icon;
      appendWeather(currentTempFahrenheit, maxTempFahrenheit, minTempFahrenheit, response.name);
    }).fail(function() {
      console.log('failed ', response);
    });
  };

  var appendWeather = function(temp, maxTemp, minTemp, city) {
    $('#find-weather-small').empty();
    $('#temp-container').empty();
    $('#city').empty();
    $('#max').empty();
    $('#min').empty();

    $('#temp-container').append('<h1 class="txt-center txt-l m-l txt-white" id="temp">' + temp + '<span class="degree-symbol clear">&deg</span></h1>');
    $('#city').append(city);
    $('#max').append("hi " + maxTemp);
    $('#min').append("lo " + minTemp);
    // $('#icon').append('<img src="http://openweathermap.org/img/w/' + icon + '.png">');
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