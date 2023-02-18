import { webSocket, WebSocketSubject } from "rxjs/webSocket";

export class WebSocketAPI {


    _connect(url:string) {
      const subject = webSocket(url);
      subject.subscribe({
        next: msg => console.log('message received: ' + msg), // Called whenever there is a message from the server.        error: (err: any) => console.log(err)}, // Called if at any point WebSocket API signals some kind of error.
        complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
})


    constructor(){


      socket.onmessage = function(event) {
        alert(`[message] Data received from server: ${event.data}`);
      };

      socket.onclose = function(event) {
        if (event.wasClean) {
          alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
          // e.g. server process killed or network down
          // event.code is usually 1006 in this case
          alert('[close] Connection died');
        }
      };

      socket.onerror = function(error) {
        alert(`[error]`);
      };
      };
    }



}
