var express = require('express');
var http = require('http');
var io = require('socket.io');
var fs = require('fs'); 
 
 
var app = express();
app.use(express.static('./public'));

var server =http.createServer(app).listen(8124);
//Server listens on the port 8124
io = io.listen(server); 

io.sockets.on("connection",function(socket){
  var file = './public/temp.json';
  var message_to_client = {
    data:"Connection with the server established"
  }
  
  socket.send(JSON.stringify(message_to_client)); 
   
  console.log('Socket.io Connection with the client established');
  
  socket.on("message",function(data){
  /*This event is triggered at the server side when client sends the data using socket.send() method */
    data = JSON.parse(data);
    fs.writeFile(file, JSON.stringify(data, null, 4), function(err) {
        if(err) {
             console.log(err);
         } else {
             console.log("JSON saved to my.json");
         }
    });
    
    console.log(data);
    /*Printing the data */
    var ack_to_client = {
      data:"Server Received the message"
    }
    socket.send(JSON.stringify(ack_to_client));
        /*Sending the Acknowledgement back to the client , this will trigger "message" event on the clients side*/
    });
 
});