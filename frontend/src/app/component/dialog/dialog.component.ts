import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CallServiceService } from 'src/app/services/call-service.service';
import { DataService } from 'src/app/services/data.service';
import { FlexData, Page, ReactiveData } from 'src/app/shared/application_data';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  page: Page | undefined = undefined;
  reactivityData = new Map<string, ReactiveData>();
  flexData = new Map<string, FlexData>();

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialog_url: string,
    private http: HttpClient,
    private aRoute: ActivatedRoute,
    private call: CallServiceService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    let url_: string
    if (this.dialog_url.includes('http')){
      url_ = this.dialog_url
    } else {
      let first = this.call.my_url()
      if (this.dialog_url[0] === "/"){
        this.dialog_url = this.dialog_url.substring(1)
      }
      url_ = first + this.dialog_url
    }

    let convMap = this.dataService.get_all()



    this.http
      .post<Page>(url_, convMap)
      .subscribe((data) => {
        this.page = data;
      });

  }

  setFlex(url: string, flexData: FlexData){
    this.flexData.set(url, flexData)
  }

  setReactivity(url: string, reactiveData: ReactiveData){
    this.reactivityData.set(url, reactiveData)
  }
}
