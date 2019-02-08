This is a small example to demonstrate the wide range that is openend by
making use of the power embedded in nodejs and its adapter to Caché.
Node / JavaScript have wide reputation to work as a WebSocket client.
By the using the Caché adapter it becomes easy to control it and
consume the results.

I used node-v6.16.0-x64.msi  and  cache610.node as Cache.node

You provide a Global for input and get back a Global for output.

     ^WsockIn="wss://echo.websocket.org/"
     ^WsockIn(0)=6
     ^WsockIn(1)="Hello"
     ^WsockIn(2)="World !"
     ^WsockIn(3)="Robert"
     ^WsockIn(4)="is waiting"
     ^WsockIn(5)="for replies"
     ^WsockIn(6)="exit"

 and with this echo server yopu get back a Global for output.
     ^WsockOut(0)=6
     ^WsockOut(1)="Hello"
     ^WsockOut(2)="World !"
     ^WsockOut(3)="Robert"
     ^WsockOut(4)="is waiting"
     ^WsockOut(5)="for replies"
     ^WsockOut(6)="exit"



you may call it from with class code or routine
      
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
