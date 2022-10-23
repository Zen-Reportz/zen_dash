import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MEData } from 'src/app/shared/application_data';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() url!: string;
  value!: number;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.value =  this.dataService.all_input.get(this.url).slider_data.value as number
  }

  isInverted() {
    return this.dataService.all_input.get(this.url).slider_data.invert as boolean;
  }

  isMax() {
    return this.dataService.all_input.get(this.url).slider_data.max as number;
  }

  isMin() {
    return this.dataService.all_input.get(this.url).slider_data.min as number;
  }

  step() {
    return this.dataService.all_input.get(this.url).slider_data.step as number;
  }

  isThumbLabel() {
    return this.dataService.all_input.get(this.url).slider_data.thumbLabel as boolean;
  }

  isVertical() {
    return this.dataService.all_input.get(this.url).slider_data.vertical as boolean;
  }

     // value: number| undefined
    // tick_interval: number | string | undefined

  detectChange() {
    let m = new MEData();
    m.key = this.dataService.all_input.get(this.url).slider_data.name as string;
    m.value = this.value;
    this.dataService.data_setter.emit(m);
  }
}
