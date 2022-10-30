import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';
import { Observable, Subscription } from 'rxjs';
import { CallServiceService } from 'src/app/services/call-service.service';
import { DataService } from 'src/app/services/data.service';
import { DownloadData } from 'src/app/shared/application_data';

@Component({
  selector: 'app-app-download',
  templateUrl: './app-download.component.html',
  styleUrls: ['./app-download.component.scss'],
})
export class AppDownloadComponent implements OnInit {
  @Input() url!: string;
  data!: DownloadData ;
  downloadCall: Subscription | undefined;

  constructor(
    private dataService: DataService,
    private fileSaverService: FileSaverService,
    private callService: CallServiceService
  ) {}

  onSave() {
    if (this.downloadCall !== undefined) {
      this.downloadCall.unsubscribe();
    }
    let p = this.callService.call_response(this.data?.url as string, {
      responseType: 'blob',
      observe: 'response',
    }, undefined) as Observable<HttpResponse<Blob>>;

    this.downloadCall = p.subscribe((res) => {
      this.fileSaverService.save(res.body, this.data?.file_name);
    });
  }

  ngOnInit() {
    this.data = this.dataService.get_input_data(this.url)?.download_data as DownloadData
  }

  fileName() {
    return this.data?.file_name;
  }

  onSuc(event: any) {}

  onErr(event: any) {}
}
