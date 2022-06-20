import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../component/application_data';
import { DataService } from '../shared/data.service';
import { SetTitleService } from '../shared/set-title.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  page: Page | undefined = undefined

  constructor(
    private http: HttpClient,
    private titleService: Title,
    private aRoute: ActivatedRoute,
    private data_service: DataService
  ) {}

  ngOnInit(): void {
    new SetTitleService().set_title(this.aRoute, this.titleService, this.http)
    this.aRoute.fragment.subscribe((fragment) => {
      if (fragment === null ){
        fragment = "/"
      }
      let params = new HttpParams().set("fragment", fragment);

      this.http.get<Page>(location.origin+"/backend/page_detail", { params: params }).subscribe((data) => {
        this.page = data
      })

    })
  }
}

