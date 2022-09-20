import { UploadData } from './../../shared/application_data';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable, Subscription } from 'rxjs';
import { CallServiceService } from 'src/app/services/call-service.service';

@Component({
  selector: 'app-app-upload',
  templateUrl: './app-upload.component.html',
  styleUrls: ['./app-upload.component.scss'],
})
export class AppUploadComponent implements OnInit {
  @Input() uuid!: string;
  data: UploadData | undefined;
  myFiles: File[] = [];
  uploadCall: Subscription | undefined;

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private callService: CallServiceService
  ) {}

  ngOnInit(): void {
    this.data = this.dataService.upload_data.get(this.uuid);
  }
  getMultiple() {
    return this.data?.multi;
  }

  saveData(event: any) {
    this.myFiles = [];

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

    let p = this.callService.call_response(this.data?.url as string,undefined, formData) as Observable<Object>;

    this.uploadCall = p.subscribe((res) => {
      alert('Uploaded Successfully.');
    });
  }
}
