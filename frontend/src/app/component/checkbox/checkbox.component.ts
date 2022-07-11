import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { CheckboxInstance, MEData } from '../../shared/application_data';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() uuid!: string;
  name!: string

  constructor(private dataService: DataService) { }

  ngOnInit(): void {


  }


  update(){
    let m = new MEData();
    m.key = this.dataService.checkbox_data.get(this.uuid)?.name as string

    m.value =  this.dataService.checkbox_data.get(this.uuid)?.data


    this.dataService.data_setter.emit(m)
  }

  get_style(){
    return this.dataService.checkbox_data.get(this.uuid)?.style
  }

  my_data(){
    return this.dataService.checkbox_data.get(this.uuid)?.data as CheckboxInstance[]
  }

}
