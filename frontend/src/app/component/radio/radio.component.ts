import { Component, Input, OnInit } from '@angular/core';
import { MEData } from 'src/app/shared/application_data';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {
  @Input() uuid!: string;

  data!: string[];
  selected!: string;


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.selected = this.dataService.radio_data.get(this.uuid)?.selected as string
  }

  getStyle(){
    return this.dataService.radio_data.get(this.uuid)?.style as string
  }


  update(){
    let m = new MEData();
    m.key = this.dataService.radio_data.get(this.uuid)?.name as string
    m.value =  this.selected
    this.dataService.data_setter.emit(m)
  }

  getData(){
    return this.dataService.radio_data.get(this.uuid)?.data
  }

}
