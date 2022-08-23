import { UploadData } from './../../shared/application_data';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-app-upload',
  templateUrl: './app-upload.component.html',
  styleUrls: ['./app-upload.component.scss']
})
export class AppUploadComponent implements OnInit {
  @Input() uuid!: string
  data: UploadData | undefined
  myFiles:  File[] = [];

  constructor(private http: HttpClient, private dataService: DataService   ) {}

  ngOnInit(): void {
    this.data = this.dataService.upload_data.get(this.uuid)

  }
  getMultiple() {
    return this.data?.multi
  }

  saveData(event:any){
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
  }
  const formData = new FormData();

  for (var i = 0; i < this.myFiles.length; i++) {
    formData.append("files", this.myFiles[i]);
  }


    this.http.post(location.origin + this.data?.url, formData)
    .subscribe(res => {
      alert('Uploaded Successfully.');
    })
  }


}
