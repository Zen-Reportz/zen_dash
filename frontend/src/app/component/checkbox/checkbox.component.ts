import { CheckboxData } from './../../shared/application_data';
import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { CheckboxInstance, MEData } from '../../shared/application_data';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @Input() url!: string;
  name!: string;
  data!: CheckboxData
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.data = this.dataService.all_input.get(this.url).checkbox_data

  }

  update() {
    let m = new MEData();
    m.key = this.data.name as string;
    m.value = this.data.data;

    this.dataService.data_setter.emit(m);
  }

  get_style() {
    return this.data.style;
  }

  my_data() {
    return this.data.data as CheckboxInstance[];
  }
}
