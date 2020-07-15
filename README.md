~~~
 This is a coding example working on Cache 2018.1.3  
 It will not be kept in synch with new versions      
 It is also NOT covered by InterSystems Support !   
~~~  

It will demonstrate the wide range that is openend by making use   
of the power embedded in Node.js and its adapter to Caché.  
Node / JavaScript have wide reputation to work as a WebSocket client.  
By using the Caché adapter it becomes easy to control it and to consume the results as a   
Client for WebSocket Servers and to collect the replies in Caché, Ensemble, ..   

I used node-v6.16.0-x64.msi  and  cache610.node as cache.node

You provide a Global for input:

     ^WsockIn="wss://echo.websocket.org/"
     ^WsockIn(0)=6
     ^WsockIn(1)="Hello"
     ^WsockIn(2)="World !"
     ^WsockIn(3)="Robert"
     ^WsockIn(4)="is waiting"
     ^WsockIn(5)="for replies"
     ^WsockIn(6)="exit"

and with this echo server you get back a Global as output

     ^WsockOut(0)=6
     ^WsockOut(1)="Hello"
     ^WsockOut(2)="World !"
     ^WsockOut(3)="Robert"
     ^WsockOut(4)="is waiting"
     ^WsockOut(5)="for replies"
     ^WsockOut(6)="exit"

you may call it from with class code or routine or command line
      
      kill ^WsockOut
      do $zf(-1,"node ""C:\Program Files\nodejs\samples\WsockDemo""")
      zwrite ^WsockOut
      
or in verbose mode

      SAMPLES>$node "C:\Program Files\nodejs\samples\WsockDemo"

      start
      server:  wss://echo.websocket.org/
      Lines to process:  6

      WebSocket Client Connected
      client ready

      Line:  1  text:  Hello
      Line:  2  text:  World !
      Line:  3  text:  Robert
      Line:  4  text:  is waiting
      Line:  5  text:  for replies
      Line:  6  text:  exit
      lines sent:  6

      Received: 'Hello'
      Received: 'World !'
      Received: 'Robert'
      Received: 'is waiting'
      Received: 'for replies'
      Received: 'exit'
      replies received:  6

      Client Closed
      SAMPLES>

Using the WebSocket Server in namespace SAMPLES

>>     ws://localhost:57772/csp/samples/Web.SocketTest.cls

the replies look like this:
   
    Received: 'Welcome to Cache WebSocket. NameSpace: SAMPLES'
    Received: ''Hello' (length=5) recieved on 08 Feb 2019 at 02:57:08PM NameSpace=SAMPLES'
    Received: ''World !' (length=7) recieved on 08 Feb 2019 at 02:57:08PM NameSpace=SAMPLES'
    Received: ''Robert' (length=6) recieved on 08 Feb 2019 at 02:57:08PM NameSpace=SAMPLES'
    Received: ''is waiting' (length=10) recieved on 08 Feb 2019 at 02:57:08PM NameSpace=SAMPLES'
    Received: ''for replies' (length=11) recieved on 08 Feb 2019 at 02:57:08PM NameSpace=SAMPLES'
    replies received:  6

    Client Closed
    
.  
.
.  
I have to admit this was my first piece of code to run in Node.js.
