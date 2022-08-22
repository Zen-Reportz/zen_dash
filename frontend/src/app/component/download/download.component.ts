import { DownloadData } from './../../shared/application_data';
import { Component, Input, OnInit } from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';
import { DataService } from 'src/app/shared/data.service';
import { HttpClient } from '@angular/common/http';
import { InputData } from 'src/app/shared/application_data';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  @Input() uuid!: string
  data:   DownloadData | undefined

  constructor(private http: HttpClient, private dataService: DataService,     private fileSaverService: FileSaverService    ) {

  }

  onSave() {
    let convMap: any = {};
    this.dataService.data.forEach((val: string, key: string) => {
      convMap[key] = val;
    })

    console.log(location.origin + this.data?.url)
    this.http.post(location.origin + this.data?.url, convMap , {responseType:"blob", observe:"response"} ).subscribe(res=> {
      this.fileSaverService.save(res.body, this.data?.file_name);
    });

}

  ngOnInit() {
    this.data = this.dataService.download_filter_data.get(this.uuid)

  }

  fileName(){
    return this.data?.file_name
  }

  onSuc(event:any){
    console.log(event)
  }

  onErr(event: any){
    console.log(event)
  }

}
