import { ReactiveData } from './../shared/application_data';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CallServiceService } from '../services/call-service.service';
import { DataService } from '../services/data.service';
import { CustomScripts, FlexData, Page } from '../shared/application_data';
import { SetTitleService } from '../shared/set-title.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  page: Page | undefined = undefined;
  reactivityData = new Map<string, ReactiveData>();
  flexData = new Map<string, FlexData>();


  constructor(
    private http: HttpClient,
    private titleService: Title,
    private aRoute: ActivatedRoute,
    private call: CallServiceService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    new SetTitleService().set_title(this.aRoute, this.titleService, this.http);
    this.aRoute.queryParamMap.subscribe((fragment) => {
      let page = this.dataService.get_page()
      let params = new HttpParams().set('fragment', page);

      this.http
        .get<Page>(this.call.my_url()  +'backend/page_detail', { params: params })
        .subscribe((data) => {
          this.page = data;
        });
    });
  }

  setFlex(url: string, flexData: FlexData){
    this.flexData.set(url, flexData)
  }

  setReactivity(url: string, reactiveData: ReactiveData){
    this.reactivityData.set(url, reactiveData)
  }
}
