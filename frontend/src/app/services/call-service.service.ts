import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ResponseData, UpdateReturnData } from '../shared/application_data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CallServiceService {
  constructor(private http: HttpClient, private dataService: DataService) {}

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
      this.dataService.data.forEach((val: string, key: string) => {
        convMap.append(key, val);
      })
    } else {
      convMap = this.dataService.get_all()

    }

    let p:
      | Observable<ResponseData>
      | Observable<HttpResponse<Blob>>
      | Observable<Object>;
    if (parameters === undefined) {
      p = this.http.post<ResponseData>(url_, convMap);
    } else {
      p = this.http.post<ResponseData>(url_, convMap, parameters);
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

    p = this.http.post<UpdateReturnData>(url_, convMap);

    return p;
  }

  my_url(){
    return window.location.href.split("#")[0]
  }
}
