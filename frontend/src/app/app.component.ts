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
  document_id: any;
  color: string = 'primary';
  private _mobileQueryListener: () => void;
  checked = false;
  runRefresh!: any;
  show_right_sidebar!: string

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private http: HttpClient,
    public ds: DataService,
    private _snackBar: MatSnackBar,
    private aRoute: ActivatedRoute,
    private call: CallServiceService,
    private titleService: Title,
    private clipboard: Clipboard,
    private cs: CookieService
  ) {
    this.ds.data_setter.subscribe((t) => {
      this.color = 'warn';
    });

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.aRoute.queryParamMap.subscribe((fragment) => {

      let page = this.ds.get_page();
      // this.ds.refresh.emit('PageRefresh');
      if (this.ds.data['global'] === undefined) {
        this.ds.data['global'] = {};
      }

      this.ds.data['global']['page'] = page;
      this.color = 'primary';
    });
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {

    this._snackBar.openFromComponent(LoadingComponent, {
      duration: 5 * 1000,
      data: { message: 'API called Sucessfully ', status: 'loading' },
    });

    this.show_right_sidebar = this.cs.get("show_right_sidebar")


    this.getScripts();
    this.http
      .get<string>(this.call.my_url() + 'backend/title')
      .subscribe((data) => {
        this.titleService.setTitle(data);
        this.title = data;
      });
  }

  refresh_data() {
    this.color = 'primary';

    this.ds.refresh.emit('RefreshButton');

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

  set_size(event: string) {
    this.mySize = event;
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

  call_refresh(ds: any) {
    ds.refresh.emit("AutoRefresh");
  }

  set_auto(event: any) {
    if (event.checked) {
      this.runRefresh = setInterval(this.call_refresh, 5 * 60 * 1000, this.ds);
    } else {
      clearInterval(this.runRefresh);
    }
  }
}
