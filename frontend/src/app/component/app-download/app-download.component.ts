import { UUID } from 'angular2-uuid';
import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileSaverService } from 'ngx-filesaver';
import { Observable, Subscription } from 'rxjs';
import { CallServiceService } from 'src/app/services/call-service.service';
import { DataService } from 'src/app/services/data.service';
import { DownloadData, MEData } from 'src/app/shared/application_data';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-app-download',
  templateUrl: './app-download.component.html',
  styleUrls: ['./app-download.component.scss'],
})
export class AppDownloadComponent implements OnInit {
  @Input() url!: string;
  data!: DownloadData ;
  downloadCall: Subscription | undefined;
  show: boolean = false

  constructor(
    private ds: DataService,
    private fileSaverService: FileSaverService,
    private callService: CallServiceService,
    private _snackBar: MatSnackBar

  ) {}

  getFileName(disposition: string): any {
    let utf8FilenameRegex = /filename\*=UTF-8''([\w%\-\.]+)(?:; ?|$)/i;
    let asciiFilenameRegex = /^filename=(["']?)(.*?[^\\])\1(?:; ?|$)/i;

    let fileName: any = null;
    if (utf8FilenameRegex.test(disposition)) {
      let p = utf8FilenameRegex.exec(disposition) as any
      fileName = decodeURIComponent(p[1]);
    } else {
      // prevent ReDos attacks by anchoring the ascii regex to string start and
      //  slicing off everything before 'filename='
      const filenameStart = disposition.toLowerCase().indexOf('filename=');
      if (filenameStart >= 0) {
        const partialDisposition = disposition.slice(filenameStart);
        const matches = asciiFilenameRegex.exec(partialDisposition );
        if (matches != null && matches[2]) {
          fileName = matches[2];
        }
      }
    }
    return fileName;
}

  onSave() {

    this.show = true

    if (this.downloadCall !== undefined) {
      this.downloadCall.unsubscribe();
    }
    let p = this.callService.call_response(this.data?.url as string, {
      responseType: 'blob',
      observe: 'response',
    }, undefined) as Observable<HttpResponse<Blob>>;

    this.downloadCall = p.subscribe((res) => {
      let m = new MEData();
      m.page = this.ds.dataLookup(false);
      m.key = this.ds.all_input.get(this.url)?.download_data?.name as string
      m.value = UUID.UUID();
      m.url = this.url;
      this.ds.data_setter.emit(m);
      let contentDisposition = res.headers.get('content-disposition') as string
      let filename = this.getFileName(contentDisposition)
      this.fileSaverService.save(res.body, filename);
      this.show = false
    }, (error) => {
      this.show = false
      this._snackBar.openFromComponent(LoadingComponent, {
        duration: 5 * 1000,
        data: { message: 'Failed download', status: 'error' },

      });
    });
  }

  ngOnInit() {
    this.data = this.ds.get_input_data(this.url)?.download_data as DownloadData
  }

  fileLabel() {
    return this.data?.label;
  }

  onSuc(event: any) {}

  onErr(event: any) {}
}
