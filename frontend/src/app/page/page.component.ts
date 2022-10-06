import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FlexData, Page } from '../shared/application_data';
import { SetTitleService } from '../shared/set-title.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  page: Page | undefined = undefined;

  size_data = new Map<string, FlexData>();

  constructor(
    private http: HttpClient,
    private titleService: Title,
    private aRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let href = this.router.url;

    new SetTitleService().set_title(this.aRoute, this.titleService, this.http);
    this.aRoute.fragment.subscribe((fragment) => {
      if (fragment === null) {
        fragment = '/';
      }
      let params = new HttpParams().set('fragment', fragment);

      this.http
        .get<Page>(href+'/backend/page_detail', { params: params })
        .subscribe((data) => {
          this.page = data;
        });
    });
  }

  setFlex(flex: FlexData, url: string) {
    if (flex !== null) {
      this.size_data.set(url, flex);
    }
  }

  getScripts(){

  }
  getFlex(original: string, type: string, url: string) {
    let response: any;
    if (this.size_data.get(url)?.fxFlex !== undefined) {
      if (this.size_data.get(url)?.fxFlex !== null) {
        if (type == 'flex') {
          response = this.size_data.get(url)?.fxFlex;
        } else if (type == 'flex_md') {
          response = this.size_data.get(url)?.fxFlex_md;
        } else if (type == 'flex_sm') {
          response = this.size_data.get(url)?.fxFlex_sm;
        } else if (type == 'flex_xs') {
          response = this.size_data.get(url)?.fxFlex_xs;
        } else {
          console.log(' issue with type for ' + url + ' ' + type);
          response = original;
        }
      } else {
        console.log(' issue with type for ' + url + ' ' + type);
        response = original;
      }
    } else {
      // console.log("No data so returning original")
      response = original;
    }

    return response;
  }
}
