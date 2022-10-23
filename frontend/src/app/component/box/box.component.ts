import { BoxData } from './../../shared/application_data';
import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
})
export class BoxComponent implements OnInit {
  @Input() url!: string;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
  }



  getIcon() {
    return this.dataService.all_input.get(this.url).box_data.icon;
  }

  getValue() {
    return this.dataService.all_input.get(this.url).box_data.value;
  }

  getName() {
    return this.dataService.all_input.get(this.url).box_data.name;
  }
}
