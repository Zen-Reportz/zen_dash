import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { BoxData } from '../application_data';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {
  @Input() url!: string;
  data!: BoxData
  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit(): void {
    // let params = new HttpParams().set("fragment", fragment);
      this.getData()
      this.dataService.refresh.subscribe((t) => {
        this.getData()
      })
  }

  getData(){
    this.http.post<BoxData>(location.origin + this.url, this.dataService.data).subscribe((t) => {
      this.data = t
    })
  }

  getIcon(){
    return (this.data && this.data.icon) ? this.data.icon : "Loading"
  }

  getValue(){
    return (this.data && this.data.value) ? this.data.value : "Loading"

  }

  getName(){
    return (this.data && this.data.name) ? this.data.name : "Loading"

  }

  getAdditionalInfo(){
    return (this.data && this.data.additional_info) ? this.data.additional_info : ""

  }


}


