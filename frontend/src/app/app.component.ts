import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingComponent } from './component/loading/loading.component';
import { DataService } from './services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string | undefined;
  mobileQuery: MediaQueryList;
  durationInSeconds = 5;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private http: HttpClient,
              private data_service:DataService,
              private _snackBar: MatSnackBar){

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(){
    this.mobileQuery.removeListener(this._mobileQueryListener);

  }

  ngOnInit(){

    this.http.get<string>(window.location.href.split("#")[0] + "backend/title").subscribe(data => {this.title = data})
  }

  refresh_data(){
    this.data_service.refresh.emit('')
    this._snackBar.openFromComponent(LoadingComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }



}
