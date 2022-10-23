import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MEData } from 'src/app/shared/application_data';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent implements OnInit {
  @Input() url!: string;

  data!: string[];
  selected!: string;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.selected = this.dataService.all_input.get(this.url).radio_data.selected as string;
  }

  getStyle() {
    return this.dataService.all_input.get(this.url).radio_data.style as string;
  }

  update() {
    let m = new MEData();
    m.key = this.dataService.all_input.get(this.url).radio_data.name as string;
    m.value = this.selected;
    this.dataService.data_setter.emit(m);
  }

  getData() {
    return this.dataService.all_input.get(this.url).radio_data.data;
  }
}
