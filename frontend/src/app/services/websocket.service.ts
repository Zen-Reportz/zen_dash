import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { DataService } from './data.service';
import { ResponseData } from '../shared/application_data';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  subject!: WebSocketSubject<unknown> | undefined
  constructor(
    private aRoute: ActivatedRoute,
    private ds: DataService,

  ) {

  }


  request_change(){
      let data = this.ds.get_all()
      if (this.subject !== undefined){
        this.subject.next(data);
      } else {
        // console.log("websocket is not present")
      }



  }

  ws_or_wss(){
    if (window.location.href.split("/?")[0].includes("https")){
      let url =  window.location.href.split("?")[0].split("https://")[1]
      url = url.substring(0,url.length-1);
      return "wss://" + url
    } else {
      let url = window.location.href.split("?")[0].split("http://")[1]
      url = url.substring(0,url.length-1);
      return "ws://" + url
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  save_data(message:any, ds:DataService){



    for (const [key, value] of Object.entries(message)) {

      let parsed_value = JSON.parse(value as string)  as ResponseData
      ds.input_emitter.emit({"calling": true, "lookup": key, "t": undefined, "message": undefined})

      let p = new Promise(resolve => setTimeout(resolve, 2000))
      p.then(() => {
        ds.all_input.delete(key);
        ds.all_input.set(key, parsed_value);
        ds.input_emitter.emit({"calling": false, "lookup": key, "t": parsed_value, "message": undefined})
      })

    }

  }




  connect(url: string, error: any=undefined) {

    if (error === "complete"){
      delete this.subject
    }
    if (error !== undefined){

      console.log(error)
    }

    let final_url = this.ws_or_wss() + url
    let data = this.ds.get_all()

    let p = new Promise(resolve => setTimeout(resolve, 10000))

    p.then(() => {
      this.subject = webSocket(final_url);

      this.subject.subscribe({
        next: (msg) => this.save_data(msg, this.ds), // Called whenever there is a message from the server.
        error: (err) => this.connect(final_url, err), // Called if at any point WebSocket API signals some kind of error.
        complete: () => this.connect(final_url, "complete"), // Called when connection is closed (for whatever reason).
      });
      this.subject.next(data);

    })


  }

}
