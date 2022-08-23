import { DataImage } from './../../shared/application_data';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/shared/data.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-app-image',
  templateUrl: './app-image.component.html',
  styleUrls: ['./app-image.component.scss']
})
export class AppImageComponent implements OnInit {
  @Input() uuid!: string
  data: DataImage | undefined
  image: Blob | undefined | null
  imageURL!: SafeUrl
  height!: string
  width!: string

  constructor(private http: HttpClient, private dataService: DataService , private sanitizer: DomSanitizer  ) {}

  ngOnInit(): void {
    let convMap: any = {};
    this.dataService.data.forEach((val: string, key: string) => {
      convMap[key] = val;
    })

    this.data = this.dataService.image_data.get(this.uuid)
    this.height = this.data?.height as string
    this.width = this.data?.width as string


    this.http.post(location.origin + this.data?.url, convMap ,  {responseType:"blob", observe:"response"})
    .subscribe(res => {
      this.image = res.body
      if (this.image !== null){
        this.imageURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image))
      }

    })

  }




}
