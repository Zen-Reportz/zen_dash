import { ApiCallService } from 'src/app/services/api-call.service';
import {
  ButtonData,
  MEData,
  UpdateReturnData,
} from './../../shared/application_data';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { CallServiceService } from 'src/app/services/call-service.service';
import { LoadingComponent } from '../loading/loading.component';
import { MatDialog } from '@angular/material/dialog';
import { SupportDialogComponent } from '../support-dialog/support-dialog.component';
import { Observable, Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() url!: string;
  data!: ButtonData;
  myFiles: File[] = [];
  show: boolean = false;
  second_call: any;
  downloadCall: Subscription | undefined;

  constructor(
    private ds: DataService,
    private callService: CallServiceService,
    private _snackBar: MatSnackBar,
    public _dialog: MatDialog,
    public api_call_service: ApiCallService,
    private fileSaverService: FileSaverService,

  ) {}

  reactiveity(type: string, value: string = '') {
    let m = new MEData();
    m.page = this.ds.dataLookup(false);
    m.key =
      (this.data.name as string) +
      '_' +
      type;

    if (value === '') {
      m.value = this.ds.makeid(2);
    } else {
      m.value = value;
    }

    m.url = this.url + '_' + type;
    this.ds.data_setter.emit(m);
  }

  ngOnInit(): void {
    this.data = this.ds.all_input.get(this.url)?.button_data as ButtonData;
  }

  open_dialog(tt: UpdateReturnData) {
    let dialogRef = this._dialog.open(SupportDialogComponent, {
      width: tt?.display_dialog?.width,
      height: tt?.display_dialog?.height,
      data: { custom_html: tt?.display_dialog?.custom_message },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  get_type(){
    return this.data.button_type
  }


  get_color() {
    return this.data.color;
  }

  get_style() {
    return this.data?.style;
  }

  get_icon() {
    return this.data?.icon;
  }


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


  trigger() {
    this.reactiveity('triggered');
    this.show = true

    if (this.downloadCall !== undefined) {
      this.downloadCall.unsubscribe();
    }

    if (this.data.download){
      this.download_data()
      return
    }

    if (this.data.redirect) {
      // console.log(this.data.url)
      window.open(this.data.url, this.data.target_attribute);
      return
    } else {
      if (this.second_call !== undefined) {
        this.second_call.unsubscribe();
      }
    }

    let p = this.callService.second_call_response(
      this.data.url,
      this.data.name,
      ''
    );
    this.second_call = p.subscribe(
      (res) => {
        try {
          var tt = res as UpdateReturnData;
          if (tt.button_data !== undefined) {
            this.reactiveity('result', tt.button_data?.name);
          }

          this._snackBar.openFromComponent(LoadingComponent, {
            duration: (tt.display?.duration as number) * 1000,
            data: { message: tt.display?.message, status: tt.display?.status },
          });
          this.show = false;


          if (tt.display_dialog !== undefined) {
            this.open_dialog(tt);
          }

          if (tt.ui_data !== undefined) {
            this.api_call_service.saveUIData(tt.ui_data);
          }
          this.reactiveity('success');


          if (tt.button_data !== undefined) {
            if (tt.button_data.redirect) {
              // console.log(this.data.url)
              window.open(tt.button_data.url, tt.button_data.target_attribute);
            }
          }
        } catch {
          this._snackBar.openFromComponent(LoadingComponent, {
            duration: 5000,
            data: { message: 'backend failed', status: 'error' },
          });
        }
      },
      (error) => {
        this.show = false;
        this.reactiveity('failed');
        this._snackBar.openFromComponent(LoadingComponent, {
          duration: 5 * 1000,
          data: { message: 'API called Failed', status: 'error' },
        });
      }
    );
  }

  download_data(){

    let p = this.callService.call_response(this.data?.url as string, {
      responseType: 'blob',
      observe: 'response',
    }, undefined) as Observable<HttpResponse<Blob>>;

    let m = new MEData();

    this.downloadCall = p.subscribe((res) => {
      this.reactiveity('download', "success");
      this.ds.data_setter.emit(m);
      let contentDisposition = res.headers.get('content-disposition') as string
      let filename = this.getFileName(contentDisposition)
      this.fileSaverService.save(res.body, filename);
      this.show = false
    }, (error) => {
      this.reactiveity('download', "failed");
      this.show = false
      this.ds.data_setter.emit(m);
      this._snackBar.openFromComponent(LoadingComponent, {
        duration: 5 * 1000,
        data: { message: 'Failed download', status: 'error' },

      });
    });
  }
}
