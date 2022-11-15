import { IframeData } from './../../shared/application_data';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-app-iframe',
  templateUrl: './app-iframe.component.html',
  styleUrls: ['./app-iframe.component.scss'],
})
export class AppIframeComponent implements OnInit {
  @Input() url!: string;
  data!: IframeData;
  constructor(protected sanitizer: DomSanitizer, private ds: DataService) {}

  ngOnInit(): void {
    this.data = this.ds.get_input_data(this.url)?.iframe_data as IframeData
    // this.data = this.sanitizer.bypassSecurityTrustUrl(u)

  }
}
