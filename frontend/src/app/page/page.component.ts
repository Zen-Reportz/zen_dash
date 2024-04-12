import { ReactiveData } from './../shared/application_data';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CallServiceService } from '../services/call-service.service';
import { DataService } from '../services/data.service';
import { CustomScripts, FlexData, Page } from '../shared/application_data';
import { SetTitleService } from '../shared/set-title.service';
import { WebsocketService } from '../services/websocket.service';
import { LoadingComponent } from '../component/loading/loading.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  page: Page | undefined = undefined;
  reactivityData = new Map<string, ReactiveData>();
  flexData = new Map<string, FlexData>();
  color: string = 'primary';
  durationInSeconds = 5;

  constructor(
    private http: HttpClient,
    private titleService: Title,
    private aRoute: ActivatedRoute,
    private call: CallServiceService,
    private dataService: DataService,
    public ds: DataService,
    private ws: WebsocketService,
    private _snackBar: MatSnackBar,

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


  refresh_data() {
    this.color = 'primary';

    if (this.call.config.websocket.active){
      this.ws.request_change()
    } else {
      this.ds.refresh.emit('RefreshButton');
    }


    this.ds.save_default();
    this._snackBar.openFromComponent(LoadingComponent, {
      duration: this.durationInSeconds * 1000,
      data: { message: 'Refreshing data', status: 'success' },
    });
  }

}
