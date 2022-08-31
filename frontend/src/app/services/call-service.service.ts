import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ResponseData } from '../shared/application_data';
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
}
