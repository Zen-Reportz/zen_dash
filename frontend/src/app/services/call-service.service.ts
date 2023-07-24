import { Injectable, EventEmitter } from '@angular/core';
import { DataService } from './data.service';
import { ErrorData, ResponseData, UpdateReturnData } from '../shared/application_data';
import { Observable, retry } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { throwError, of } from 'rxjs';
import { catchError, concatMap, delay } from 'rxjs/operators';





export class RefreshInfo {
  refresh!: boolean
  rate_in_seconds!: number
}

export class WebSocketConfig {
  active!: boolean
}

export class Auth {
  SSO!: boolean
  UP_Login!: boolean
}

export class Configuration{
  retry_count!: number
  show_right_sidebar!: boolean
  refresh !: RefreshInfo
  websocket!: WebSocketConfig
  auth!: Auth
}


@Injectable({
  providedIn: 'root',
})
export class CallServiceService {

  refresh_listener = new EventEmitter<boolean>()
  config: Configuration = {retry_count: 2,
                           show_right_sidebar: false,
                           refresh: {refresh: true, rate_in_seconds: 5*60},
                           websocket: {active: false},
                           auth: {SSO: false, UP_Login: false}
                          }

  constructor(private http: HttpClient,
              private dataService: DataService,
              private ws: WebsocketService  ) {


  }

  get_url(url: string){
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
    return url_
  }

  pullConfiguration(url="/backend/configuration"){
    url = this.get_url(url)
    this.http.get<Configuration>(url=url).subscribe((data)=> {
      this.config = data

      if (this.config.websocket.active){
        this.ws.connect("/backend/ws")
      }
      if (this.config.refresh.refresh) {
        this.refresh_listener.emit(true)
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

    let url_ = this.get_url(url)
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
      | Observable<Object>
      | Observable<unknown>

    let error_data = {"error": "Error or Unathorized"} as ErrorData
    let retry_this = this.get_retry()
    if (parameters === undefined) {
      p = this.http.post<ResponseData>(url_, convMap).pipe(
        catchError((error: HttpErrorResponse, caught) => {
          if (retry_this-- > 0 && error.status !== 401) {
            return of(error).pipe(
              delay(2000), // Delay 1 second before retry
              concatMap(() => caught) // Resubscribe to the original observable
            );
          } else {
            // If retries are exhausted or error is 401, return an Observable of an error
            return  new Observable((subscriber) => {
              subscriber.next(error_data);
            });
          }
        })
      );
    } else {
      p = this.http.post<ResponseData>(url_, convMap, parameters).pipe(
        catchError((error: HttpErrorResponse, caught) => {
          if (retry_this-- > 0 && error.status !== 401) {
            return of(error).pipe(
              delay(1000), // Delay 1 second before retry
              concatMap(() => caught) // Resubscribe to the original observable
            );
          } else {
            // If retries are exhausted or error is 401, return an Observable of an error
            return new Observable(subscriber => {
              subscriber.next(error_data);
            });
          }
        })
      );
    }

    return p;
  }

  second_call_response(url: string, search_key: string |undefined, search_value: string |undefined) {

    let url_ = this.get_url(url)

    let convMap = this.dataService.get_all()

    if (search_key !== undefined) {
      convMap[search_key] = search_value
    }

    let p: Observable<UpdateReturnData> | Observable<unknown>

    let retry_this = this.get_retry()
    let error_data = {"error": "Error or Unathorized"} as ErrorData

    p = this.http.post<UpdateReturnData>(url_, convMap).pipe(
      catchError((error: HttpErrorResponse, caught) => {
        if (retry_this-- > 0 && error.status !== 401) {
          return of(error).pipe(
            delay(1000), // Delay 1 second before retry
            concatMap(() => caught) // Resubscribe to the original observable
          );
        } else {
          // If retries are exhausted or error is 401, return an Observable of an error
          return new Observable(subscriber => {
            subscriber.next(error_data);
          });
        }
      })
    );



    return p;
  }

  my_url(){
    return window.location.href.split("?")[0]
  }

}
