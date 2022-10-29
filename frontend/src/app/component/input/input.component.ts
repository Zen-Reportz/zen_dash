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
  @Input() isSidebar!: boolean;

  data!: string;

  constructor(private ds: DataService) {}

  ngOnInit() {
    let selected = this.ds.all_input.get(this.url).input_data.value;
    if (selected !== undefined) {
      this.data = selected;
    }
  }

  getValue() {
    return this.ds.all_input.get(this.url).input_data.value;
  }

  getLabel() {
    if (this.ds.all_input.get(this.url).input_data.label) {
      return '';
    } else {
      return this.ds.all_input.get(this.url).input_data.label;
    }
  }

  saveData() {
    let m = new MEData();
    m.key = this.ds.all_input.get(this.url).input_data.name as string;
    m.value = this.data;
    m.page = this.ds.dataLookup(this.isSidebar);

    this.ds.data_setter.emit(m);
    this.ds.all_input.get(this.url).input_data.value = this.data
  }

  clearData() {
    this.data = '';
    let m = new MEData();
    m.key = this.ds.all_input.get(this.url).input_data.name as string;
    m.value = this.data;
    m.page = this.ds.dataLookup(this.isSidebar);
    this.ds.all_input.get(this.url).input_data.value = this.data
    this.ds.data_setter.emit(m);
  }
}
