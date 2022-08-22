import { InputData, MEData } from './../../shared/application_data';
import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() uuid!: string
  data!: string
  label: string | undefined

  constructor(private dataService: DataService) { }

  ngOnInit( ) {
    this.label = this.dataService.input_filter_data.get(this.uuid)?.label
  }


  getLabel(){
    if (this.label){
      return ""
    } else {
      return this.label
    }
  }

  saveData(){
    let m = new MEData();
    m.key = this.dataService.input_filter_data.get(this.uuid)?.name as string
    m.value = this.data
    this.dataService.data_setter.emit(m)

  }

  clearData(){
    this.data = ''
    let m = new MEData();
    m.key = this.dataService.input_filter_data.get(this.uuid)?.name as string
    m.value = this.data
    this.dataService.data_setter.emit(m)
  }


}
