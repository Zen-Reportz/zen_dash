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
    let convMap: any = {};
    if (formdata !== undefined){
      convMap = formdata
      this.dataService.data.forEach((val: string, key: string) => {
        convMap.append(key, val);
      })
    } else {

      this.dataService.data.forEach((val: string, key: string) => {
      convMap[key] = val;
    });
    }

    let p:
      | Observable<ResponseData>
      | Observable<HttpResponse<Blob>>
      | Observable<Object>;
    if (parameters === undefined) {
      p = this.http.post<ResponseData>(url, convMap);
    } else {
      p = this.http.post<ResponseData>(url, convMap, parameters);
    }

    return p;
  }

  second_call_response(url: string, search_key: string, search_value: string ) {
    let convMap: any = {};
    this.dataService.data.forEach((val: string, key: string) => {
        convMap[key] = val;
    })

    convMap[search_key] = search_value

    let p: Observable<UpdateReturnData>

    p = this.http.post<UpdateReturnData>(url, convMap);

    return p;
  }
}
