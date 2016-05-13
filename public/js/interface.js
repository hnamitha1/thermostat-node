$(document).ready(function() {

  thermostat = new Thermostat();
  updateTemperature();

  $('#temperature-up').click(function(){
    thermostat.increaseTemp();
    updateTemperature();
  });

  $('#temperature-down').click(function(){
    thermostat.decreaseTemp();
    updateTemperature();
  });

  $('#temperature-reset').click(function(){
    thermostat.resetTemperature();
    updateTemperature();
  });

  $('#powersaving-on').click(function(){
    thermostat.switchPowerSavingModeOn();
    $('#psave').text("ON");
  });

  $('#powersaving-off').click(function(){
    thermostat.switchPowerSavingModeOff();
    $('#psave').text("OFF");
  });

  function updateTemperature(){
    $('#temp').text(thermostat.getTemperature());
    $('#temp').attr('class', thermostat.energyUsage());
  }

  $('#submit').click(function(event) {
  //    $('#select-city').submit(function(event) {
  event.preventDefault();
  var city = $('#current-city').val();
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
    $('#outside-temp').text(data.main.temp);
  })
})

});
