import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ResponseData, UpdateReturnData } from '../shared/application_data';
import { Observable, retry } from 'rxjs';
import { WebsocketService } from './websocket.service';

export class Configuration{
  retry_count!: number
  show_right_sidebar!: boolean
  activate_websocket!: boolean
}


@Injectable({
  providedIn: 'root',
})
export class CallServiceService {
  config: Configuration = {retry_count: 2, show_right_sidebar: false, activate_websocket: false}

  constructor(private http: HttpClient,
              private dataService: DataService,
              private ws: WebsocketService  ) {


  }

  pullConfiguration(url="/backend/configuration"){
    let url_: string
    if (url.includes('http')){
      url_ = url
    } else {
      let first = this.my_url()
      if (url[0] === "/"){
        url = url.substring(1)
      }
      url_ = first + url
    }
    this.http.get<Configuration>(url=url).subscribe((data)=> {
      this.config = data
      if (this.config.activate_websocket){
        this.ws.connect("/backend/ws")
      }
    })
  }

  show_right_sidebar(){
    return this.config.show_right_sidebar
  }


  get_retry(){
    let retry_this: any
    try {
      retry_this = this.config.retry_count
    } catch (error) {
      retry_this = 2
    }

    return retry_this
  }

  call_response(url: string, parameters: any | undefined, formdata: FormData | undefined) {

    let url_: string

    if (url.includes('http')){
      url_ = url
    } else {
      let first = this.my_url()
      if (url[0] === "/"){
        url = url.substring(1)
      }
      url_ = first + url
    }
    let convMap: any = {};
    if (formdata !== undefined){
      convMap = formdata
      let d = this.dataService.get_all()
      Object.entries(d).forEach((val: any, key: any) => {
        convMap.append(key, val);
      })
    } else {
      convMap = this.dataService.get_all()

    }

    let p:
      | Observable<ResponseData>
      | Observable<HttpResponse<Blob>>
      | Observable<Object>;

    let retry_this = this.get_retry()
    if (parameters === undefined) {
      p = this.http.post<ResponseData>(url_, convMap).pipe(retry({count: retry_this, delay: 2000}));
    } else {
      p = this.http.post<ResponseData>(url_, convMap, parameters).pipe(retry({count: retry_this, delay: 2000}));
    }

    return p;
  }

  second_call_response(url: string, search_key: string, search_value: string ) {

    let url_: string
    if (url.includes('http')){
      url_ = url
    } else {
      let first = this.my_url()
      if (url[0] === "/"){
        url = url.substring(1)
      }
      url_ = first + url
    }

    let convMap = this.dataService.get_all()

    convMap[search_key] = search_value

    let p: Observable<UpdateReturnData>

    let retry_this = this.get_retry()

    p = this.http.post<UpdateReturnData>(url_, convMap).pipe(retry({count: retry_this, delay: 2000}));

    return p;
  }

  my_url(){
    return window.location.href.split("?")[0]
  }

}
