var socket = io.connect("/"); 
socket.on("message",function(message){  
  console.log("Message from the server arrived");
  message = JSON.parse(message);
  $.getJSON("temp.json", function(json) {
    console.log(json); 
    $('#current-city').val(json.current_city);
    $('#temp').text(json.temperature);
    if(json.powersave){
      $('#psave').text("ON");
    }else{
      $('#psave').text("OFF");
  	};
  	$.get('http://api.openweathermap.org/data/2.5/weather?q=' + json.current_city
  		+ '&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
     		$('#outside-temp').text(data.main.temp);
    	})
           //powersave:thermostat.powerSavingMode,
  	});
  });
  $(function(){
    $('#submit').click(function(){ 
	    var data = { 
	    	current_city:$('#current-city').val(),
	      temperature:thermostat.getTemperature(),
	      powersave:thermostat.powerSavingMode
	    }
	  socket.send(JSON.stringify(data)); 
	});
});
 