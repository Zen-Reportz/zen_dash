import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  subjects: Map<string, Map<string, WebSocketSubject<unknown>>> = new Map();
  constructor(
    private aRoute: ActivatedRoute,
    private ds: DataService,

  ) {

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


  _reconnect(url: string, page: string, f: any, lookup: string){

    (async () => {
      await this.delay(1000);
    })()
    console.log("disconnected")
    let current_page = this.ds.get_page()
    if (current_page === page){
      this.connect(url, page, f,lookup)
      console.log("connected")
    }
  }


  connect(url: string, page: string, f: any,  lookup: string) {


    // this.close(this.current_page);
    if (url.substring(0,3) === "wss") {

    } else if (url.substring(0, 2) === "ws") {

    } else {
      url = this.ws_or_wss() + url
    }

    let data = this.ds.get_all()


    if (this.subjects.get(page) === undefined) {
      this.subjects.set(page, new Map<string, WebSocketSubject<unknown>>());
    }
    let p = this.subjects.get(page) as Map<string, WebSocketSubject<unknown>>;
    // if (p.get(url)!== undefined){

    //   p.delete(url)
    // }
    const subject = webSocket(url);

    subject.subscribe({
      next: (msg) => f(msg, this.ds, lookup), // Called whenever there is a message from the server.
      error: (err) => this._reconnect(url, page, f, lookup), // Called if at any point WebSocket API signals some kind of error.
      complete: () => this._reconnect(url, page, f, lookup), // Called when connection is closed (for whatever reason).
    });
    subject.next(data);
    p.set(url, subject);
    this.aRoute.queryParamMap.subscribe((fragment) => {
      // this make sure if there are no other websocket, it will be closed when page changes
      let new_page = this.ds.get_page();
      if (page !== new_page){
        subject.complete()
      }

    });
  }

  // close(page: string) {
  //   let p = this.subjects.get(page) as Map<string, WebSocketSubject<unknown>>;
  //   if (p !== undefined) {
  //     p.forEach((value: WebSocketSubject<unknown>, key: string) => {
  //       console.log(1)
  //       value.unsubscribe()
  //       value.complete();
  //       console.log(value.closed)
  //       console.log(2)

  //     });
  //   }

  // }

  send(page: string) {
    let p = this.subjects.get(page) as Map<string, WebSocketSubject<unknown>>;
    let data = this.ds.get_all()

    if (p !== undefined) {
      p.forEach((value: WebSocketSubject<unknown>, key: string) => {
        value.next(data);
      });
    }
  }
}
