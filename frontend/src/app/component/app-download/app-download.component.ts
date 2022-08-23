import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';
import { DownloadData } from 'src/app/shared/application_data';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-app-download',
  templateUrl: './app-download.component.html',
  styleUrls: ['./app-download.component.scss']
})
export class AppDownloadComponent implements OnInit {

  @Input() uuid!: string
  data:   DownloadData | undefined

  constructor(private http: HttpClient, private dataService: DataService,     private fileSaverService: FileSaverService    ) {

  }

  onSave() {
    let convMap: any = {};
    this.dataService.data.forEach((val: string, key: string) => {
      convMap[key] = val;
    })

    this.http.post(location.origin + this.data?.url, convMap , {responseType:"blob", observe:"response"} ).subscribe(res=> {
      this.fileSaverService.save(res.body, this.data?.file_name);
    });

}

  ngOnInit() {
    this.data = this.dataService.download_data.get(this.uuid)

  }

  fileName(){
    return this.data?.file_name
  }

  onSuc(event:any){
  }

  onErr(event: any){
  }

}
