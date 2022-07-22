import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GroupFilterData, MEData } from 'src/app/shared/application_data';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-group-filter',
  templateUrl: './group-filter.component.html',
  styleUrls: ['./group-filter.component.scss']
})
export class GroupFilterComponent implements OnInit {
  @Input() uuid!: string
  dataForm = new FormControl();
  multi!: boolean

  constructor(private dataService: DataService) { }


  ngOnInit(): void {
    this.multi = this.dataService.group_filter_data.get(this.uuid)?.multi as boolean

  }


  myData(){
    let t = this.dataService.group_filter_data.get(this.uuid) as GroupFilterData
    return t.data

  }


  getLabel(){
    return this.dataService.group_filter_data.get(this.uuid)?.name
  }



  detectChange(value:any){
    let m = new MEData();
    m.key = this.dataService.group_filter_data.get(this.uuid)?.name as string

    if (this.multi){
      m.value = [value.value]

    } else {
      m.value = value.value
    }


    this.dataService.data_setter.emit(m)
  }

}
