import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingComponent } from './component/loading/loading.component';
import { DataService } from './services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CallServiceService } from './services/call-service.service';
import {Title} from "@angular/platform-browser";
import { CustomScripts } from './shared/application_data';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string | undefined;
  mobileQuery: MediaQueryList;
  durationInSeconds = 5;
  mySize = '500px'
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private http: HttpClient,
              private data_service:DataService,
              private _snackBar: MatSnackBar,
              private aRoute: ActivatedRoute,
              private call: CallServiceService,
              private titleService:Title
              ){

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.aRoute.fragment.subscribe((fragment) => {
      this.data_service.data.set('page', fragment)
      this.data_service.reset_data()
      this.getScripts()
    })
  }

  ngOnDestroy(){
    this.mobileQuery.removeListener(this._mobileQueryListener);

  }

  ngOnInit(){
    this.http.get<string>(this.call.my_url() + "backend/title").subscribe(data => {
      this.titleService.setTitle(data)
      this.title = data
    })
  }

  refresh_data(){
    this.data_service.refresh.emit('')
    this._snackBar.openFromComponent(LoadingComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  loadExternalScript(url: string| undefined, text: string | undefined, type: string) {
    const body = <HTMLBodyElement> document.body;

    if (type == "css"){
      const link = document.createElement('link');

      link.id   = UUID.UUID();
      link.rel  = 'stylesheet';
      link.type = 'text/css';
      link.media = 'all';
      if (url !== undefined) {
        link.href = url
      }
      if (text !== undefined){
        link.textContent = text
      }
      body.appendChild(link);

    }


    if (type == "javascript"){
      const script = document.createElement('script');

      script.id   = UUID.UUID();
      script.type = 'text/javascript';

      if (url !== undefined) {
        script.src = url
      }
      if (text !== undefined){
        script.text = text
      }

      script.async = true;
      script.defer = true;
      body.appendChild(script);

    }


  }

  getScripts(){
    this.http
    .post<CustomScripts>(this.call.my_url()  +'backend/scripts', this.data_service.get_all())
    .subscribe((script_data) => {
      let dd = script_data.scripts
      for (let d of dd){
        this.loadExternalScript(d.url, d.text, d.type)
      }
    });

  }

  set_size(event:string){
    this.mySize  = event
  }



}
