import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/shared/data.service';
import { GroupFilterData, MEData, ResponseData, SimpleFilterData } from '../../shared/application_data';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() url!: string;

  data!: ResponseData
  dataForm = new FormControl();
  loaded = false
  multi = false
  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit(): void {
    this.loaded = false
    this.http.get<ResponseData>(this.url).subscribe((t) => {
        this.data = t
        this.loaded = true
        if (['multi_filter', 'multi_filter_group'].indexOf(this.data.type) >= 0){
          this.multi = true
        }
    })

  }

  detectChange(value:any){
    let m = new MEData();
    m.key = this.data.filter_data?.name as string

    if (['multi_filter', 'multi_filter_group'].indexOf(this.data.type)>=0){
      m.value = [value.value]

    } else {
      m.value = value.value
    }


    this.dataService.data_setter.emit(m)
  }


  isGrouped(){
    return ['filter_group', 'multi_filter_group'].indexOf(this.data.type) >=0
  }


  myData(){
    let t = this.data.filter_data as SimpleFilterData
    return t.data

  }

  groupData(){
    let t =  this.data.filter_data as GroupFilterData
    return t.data

  }

  getLabel(){
    return this.data.filter_data?.name
  }

}
