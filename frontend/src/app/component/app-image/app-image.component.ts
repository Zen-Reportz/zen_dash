import { DataImage, ResponseData } from './../../shared/application_data';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
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
  @Input() uuid!: string;
  data: DataImage | undefined;
  image: Blob | undefined | null;
  imageURL!: SafeUrl;
  height!: string;
  width!: string;
  imageCall: Subscription | undefined;
  loading= true

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private sanitizer: DomSanitizer,
    private callService: CallServiceService
  ) {}

  ngOnInit(): void {
    this.data = this.dataService.image_data.get(this.uuid);
    this.height = this.data?.height as string;
    this.width = this.data?.width as string;
    if (this.imageCall !== undefined) {
      this.imageCall.unsubscribe();
    }

    let p = this.callService.call_response(this.data?.url as string, {
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
}
