import { MEData } from './../../shared/application_data';
import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() url!: string;
  data!: string;
  label: string | undefined;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.label = this.dataService.all_input.get(this.url).input_data.label;
    let selected = this.dataService.all_input.get(this.url).input_data.value
    if (selected !== undefined){
      this.data = selected
    }

  }

  getLabel() {
    if (this.label) {
      return '';
    } else {
      return this.label;
    }
  }

  saveData() {
    let m = new MEData();
    m.key = this.dataService.all_input.get(this.url).input_data.name as string;
    m.value = this.data;
    this.dataService.data_setter.emit(m);
  }

  clearData() {
    this.data = '';
    let m = new MEData();
    m.key = this.dataService.all_input.get(this.url).input_data.name as string;
    m.value = this.data;
    this.dataService.data_setter.emit(m);
  }
}
