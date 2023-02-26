import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  subjects: Map<string, Map<string, WebSocketSubject<unknown>>> = new Map();
  current_page: string = '';
  constructor(
    private aRoute: ActivatedRoute,
    private ds: DataService,

  ) {
    this.aRoute.queryParamMap.subscribe((fragment) => {
      // this make sure if there are no other websocket, it will be closed when page changes
      let page = this.ds.get_page();
      this.close(page)
    });
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


  connect(url: string, page: string, f: any, data: any , lookup: string) {
    // this.close(this.current_page);
    if (url.substring(0,3) === "wss") {

    } else if (url.substring(0, 2) === "ws") {

    } else {
      url = this.ws_or_wss() + url
    }


    this.current_page = page;
    if (this.subjects.get(page) === undefined) {
      this.subjects.set(page, new Map<string, WebSocketSubject<unknown>>());
    }
    let p = this.subjects.get(page) as Map<string, WebSocketSubject<unknown>>;
    console.log(url)

    const subject = webSocket(url);

    subject.subscribe({
      next: (msg) => f(msg, this.ds, lookup), // Called whenever there is a message from the server.
      error: (err) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete'), // Called when connection is closed (for whatever reason).
    });
    subject.next(data);
    p.set(url, subject);
  }

  close(page: string) {
    let p = this.subjects.get(page);
    if (p !== undefined) {
      p.forEach((value: WebSocketSubject<unknown>, key: string) => {
        value.complete();
      });
    }
  }

  send(data: any, page: string) {
    let p = this.subjects.get(page) as Map<string, WebSocketSubject<unknown>>;
    if (p !== undefined) {
      p.forEach((value: WebSocketSubject<unknown>, key: string) => {
        value.next(data);
      });
    }
  }
}
