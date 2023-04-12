import { MEData } from 'src/app/shared/application_data';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingComponent } from './component/loading/loading.component';
import { DataService } from './services/data.service';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { CallServiceService } from './services/call-service.service';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { CustomScripts } from './shared/application_data';
import { Clipboard } from '@angular/cdk/clipboard';
import {CookieService} from 'ngx-cookie-service';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title: string | undefined;
  mobileQuery: MediaQueryList;
  durationInSeconds = 5;
  mySize = '500px';
  mySize2 = '500px';
  document_id: any;
  color: string = 'primary';
  private _mobileQueryListener: () => void;
  checked = false;
  runRefresh!: any;
  show_right_sidebar!: boolean

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private http: HttpClient,
    public ds: DataService,
    private _snackBar: MatSnackBar,
    private aRoute: ActivatedRoute,
    public call: CallServiceService,
    private titleService: Title,
    private clipboard: Clipboard,
    private ws: WebsocketService  ) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  setTitle(){
    this.http
    .get<string>(this.call.my_url() + 'backend/title')
    .subscribe((data) => {
      this.titleService.setTitle(data);
      this.title = data;
    });
  }

  setGlobals(){
    this.ws.request_change()
    let page = this.ds.get_page();
    if (this.ds.data['global'] === undefined) {
      this.ds.data['global'] = {};
    }

    this.ds.data['global']['page'] = page;
    this.color = 'primary';
  }

  sendWSRequest(){
    if (this.call.config.activate_websocket) {
      this.ws.request_change()
    }
  }

  trigger_load(){
    this._snackBar.openFromComponent(LoadingComponent, {
      duration: 5 * 1000,
      panelClass: ['full_width'],
      data: { message: 'API called Sucessfully ', status: 'loading' },
    });
  }

  ngOnInit() {
    this.call.pullConfiguration()

    this.ds.data_setter.subscribe((t) => {
      this.color = 'warn';
    });

    this.aRoute.queryParamMap.subscribe((fragment) => {
      this.setGlobals()
    });
    this.trigger_load()

    this.show_right_sidebar = this.call.config.show_right_sidebar

    this.getScripts();
    this.setTitle()

  }

  refresh_data() {
    this.color = 'primary';

    if (this.call.config.activate_websocket){
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

  loadExternalScript(
    url: string | undefined,
    text: string | undefined,
    type: string,
    rel: string | undefined,
    async_: boolean,
    defer_: boolean
  ) {
    const head = <HTMLBodyElement>document.head;

    if (type === 'javascript') {
      const script = document.createElement('script');

      script.id = this.ds.makeid(5);
      script.type = 'text/javascript';

      if (url !== undefined) {
        script.src = url;
      }
      if (text !== undefined) {
        script.text = text;
      }

      script.async = async_;
      script.defer = defer_;
      head.appendChild(script);
    }

    if (type === 'link') {
      const link = document.createElement('link');

      link.id = this.ds.makeid(5);
      link.rel = rel as string;
      link.href = url as string;
      head.appendChild(link);
    }
  }

  getScripts() {
    this.http
      .post<CustomScripts>(
        this.call.my_url() + 'backend/scripts',
        this.ds.get_all()
      )
      .subscribe((script_data) => {
        let dd = script_data.scripts;
        for (let d of dd) {
          this.loadExternalScript(
            d.url,
            d.text,
            d.type,
            d.rel,
            d.async,
            d.defer
          );
        }
      });
  }

  set_size(event: string, second: boolean) {
    if (second){
      this.mySize2 = event;
    } else{
      this.mySize = event;

    }
  }

  saveReport() {
    this.document_id = this.ds.makeid(32);
    let m = new MEData();
    m.key = 'document_id';
    m.value = this.document_id;
    this.ds.data_setter.emit(m);
    this.refresh_data();

    this.call
      .call_response(
        this.call.my_url() + 'backend/document',
        undefined,
        undefined
      )
      .subscribe(
        (data) => {
          const myUrl = new URL(window.location.href);
          myUrl.searchParams.set('document_id', this.document_id);
          this.clipboard.copy(myUrl.href);

          this._snackBar.openFromComponent(LoadingComponent, {
            duration: this.durationInSeconds * 1000,
            data: { message: 'Document URL copied', status: 'success' },
          });
        },
        (error) => {
          this._snackBar.openFromComponent(LoadingComponent, {
            duration: this.durationInSeconds * 1000,
            data: { message: 'Saving report failed', status: 'error' },
          });
        }
      );
  }

  call_refresh(call: CallServiceService, ds: DataService, ws: WebsocketService) {
    console.log("call refresh")
    console.log(call.config.activate_websocket)
    if (call.config.activate_websocket){
      ws.request_change()
    } else {
      ds.refresh.emit("AutoRefresh");
    }

  }

  set_auto(event: any) {
    console.log(event)
    if (event.checked) {
      console.log("123")
      this.runRefresh = setInterval(this.call_refresh,
        1 * 60 * 1000,
        this.call,
        this.ds,
        this.ws);
    } else {
      clearInterval(this.runRefresh);
    }
  }
}
