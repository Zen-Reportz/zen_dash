import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SetTitleService {

  constructor() { }



 set_title(aRoute: ActivatedRoute, titleService: Title, http: HttpClient){
   aRoute.fragment.subscribe((fragment) => {
    if (fragment !== null) {
      titleService.setTitle(fragment);
    } else {
      http.get<string>('/backend/title').subscribe((title) => {
        titleService.setTitle(title);
      });
    }
  });
}

}
