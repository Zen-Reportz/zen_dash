import { DataImage } from './../../shared/application_data';
import { Component, Input, OnInit } from '@angular/core';
import {  HttpResponse } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';
import { CallServiceService } from 'src/app/services/call-service.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-app-image',
  templateUrl: './app-image.component.html',
  styleUrls: ['./app-image.component.scss'],
})
export class AppImageComponent implements OnInit {
  @Input() url!: string;
  image: Blob | undefined | null;
  imageURL!: SafeUrl;
  height!: string;
  width!: string;
  imageCall: Subscription | undefined;
  loading= true

  data!: DataImage

  constructor(
    private dataService: DataService,
    private sanitizer: DomSanitizer,
    private callService: CallServiceService
  ) {}

  get_data(){
    this.data = this.dataService.get_input_data(this.url).image_data
  }


  get_image(){
    this.height = this.data.height
    this.width = this.data.width

    if (this.imageCall !== undefined) {
      this.imageCall.unsubscribe();
    }

    let p = this.callService.call_response(this.data.url as string, {
      responseType: 'blob',
      observe: 'response',
    }, undefined) as Observable<HttpResponse<Blob>>;

    this.imageCall = p.subscribe((res) => {
      this.loading=false
      this.image = res.body;
      if (this.image !== null) {
        this.imageURL = this.sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(this.image)
        );
      }
    });

  }

  ngOnInit(): void {
    this.get_data()
    this.get_image()
  }


}
