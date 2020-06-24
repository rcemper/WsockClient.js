// JavaScript Document  
// get order from Global ^WsockIn
//       ^WsockIn="wss://echo.websocket.org/"
//       ^WsockIn(0)=6
//       ^WsockIn(1)="Hello"
//       ^WsockIn(2)="World !"
//       ^WsockIn(3)="Robert"
//       ^WsockIn(4)="is waiting"
//       ^WsockIn(5)="for replies"
//       ^WsockIn(6)="exit"

//
// and get the reply in Global ^WsockOut
//         ^WsockOut(0)=6
//         ^WsockOut(1)="Hello"
//         ^WsockOut(2)="World !"
//         ^WsockOut(3)="Robert"
//         ^WsockOut(4)="is waiting"
//         ^WsockOut(5)="for replies"
//         ^WsockOut(6)="exit"


var W3CWebSocket = require('websocket').w3cwebsocket;
var cachedb=require('cache');
var samples = new cachedb.Cache();
samples.open({
 ip_address: "127.0.0.1",
 tcp_port:1972,
 namespace: "SAMPLES",
 username: "_SYSTEM",
 password: "SYS",
 } );

var server;
var client ;
var linect;
var text;
var line = 0;
var reply = 0;
var rows = 0;
var exit = false;

console.info("start");

    server=samples.get({global:"WsockIn"});
console.info("server: ", server.data);

    linect=samples.get({global:"WsockIn", subscripts: [0]});
    rows=parseInt(linect.data) ;
console.info("Lines to process: ",rows, "\n");

    samples.kill({global:"WsockOut"});

    client = new W3CWebSocket(server.data);

client.onopen = function() {
    console.log('WebSocket Client Connected');
 
    function ready() {
      if (client.readyState === client.OPEN) {
console.log("client ready \n") ;

       dolines();
      }
      else { 
console.log("wait 500msec") ;

        setTimeout(ready, 500);
        }
    };
   ready(); 
};

client.onerror = function() {
console.log('Connect Error: ' + error.toString());

};
 
function dolines() { 
    do {
      line++;
      text=samples.get({global:"WsockIn", subscripts: [line]});
      client.send(text.data);
console.info("Line: ",line," text: ",text.data) ;
      } while (rows > line )
console.log("lines sent: ",line, "\n" ) ;     
  };

client.onmessage = function(e) {
    if (typeof e.data === 'string') {
console.log("Received: '" + e.data + "'");
        reply++;
        samples.set({global:"WsockOut", subscripts: [0] , data: reply } );
        samples.set({global:"WsockOut", subscripts: [reply], data: e.data } );
        exit=e.data.match(/exit/i)?true:false;
        if (exit) {
              client.close();
        } ;
    } ;
};

client.onclose = function() {
console.log("replies received: ",reply,"\n") ;
console.log('Client Closed');
    process.exit();
}; 
