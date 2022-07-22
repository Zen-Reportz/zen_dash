import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MEData, SimpleFilterData } from 'src/app/shared/application_data';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-simple-filter',
  templateUrl: './simple-filter.component.html',
  styleUrls: ['./simple-filter.component.scss']
})
export class SimpleFilterComponent implements OnInit {
  @Input() uuid!: string
  dataForm = new FormControl();
  multi!: boolean

  constructor(private dataService: DataService) { }


  ngOnInit(): void {
    this.multi = this.dataService.simple_filter_data.get(this.uuid)?.multi as boolean

  }


  myData(){
    let t = this.dataService.simple_filter_data.get(this.uuid) as SimpleFilterData
    return t.data

  }


  getLabel(){
    return this.dataService.simple_filter_data.get(this.uuid)?.name
  }



  detectChange(value:any){
    let m = new MEData();
    m.key = this.dataService.simple_filter_data.get(this.uuid)?.name as string

    if (this.multi){
      m.value = [value.value]

    } else {
      m.value = value.value
    }


    this.dataService.data_setter.emit(m)
  }


}
