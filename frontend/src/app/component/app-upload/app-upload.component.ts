import { MEData, UploadData } from './../../shared/application_data';
import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable, Subscription } from 'rxjs';
import { CallServiceService } from 'src/app/services/call-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingComponent } from '../loading/loading.component';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-app-upload',
  templateUrl: './app-upload.component.html',
  styleUrls: ['./app-upload.component.scss'],
})
export class AppUploadComponent implements OnInit {
  @Input() url!: string;
  data!: UploadData;
  myFiles: File[] = [];
  uploadCall: Subscription | undefined;

  constructor(
    private ds: DataService,
    private callService: CallServiceService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.data = this.ds.all_input.get(this.url)?.upload_data as UploadData;
  }
  getMultiple() {
    return this.data?.multi;
  }

  saveData(event: any) {


    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
    const formData = new FormData();

    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append('files', this.myFiles[i]);
    }

    if (this.uploadCall !== undefined) {
      this.uploadCall.unsubscribe();
    }

    let p = this.callService.call_response(
      this.data?.url as string,
      undefined,
      formData
    ) as Observable<Object>;

    this.uploadCall = p.subscribe(
      (res) => {
        this._snackBar.openFromComponent(LoadingComponent, {
          duration: 5 * 1000,
          data: { message: 'Sucessfully Uploaded file', status: 'sucess' },
        });
        let m = new MEData();
        m.page = this.ds.dataLookup(false);
        m.key = this.ds.all_input.get(this.url)?.upload_data?.name as string
        m.value = UUID.UUID();
        m.url = this.url;
        this.ds.data_setter.emit(m);
        this.myFiles = [];
      },
      (error) => {
        this._snackBar.openFromComponent(LoadingComponent, {
          duration: 5 * 1000,
          data: { message: 'Failed Uploaded file', status: 'error' },
        });
      }
    );
  }
}
