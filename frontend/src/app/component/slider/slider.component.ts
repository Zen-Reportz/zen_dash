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
  @Input() isSidebar!: boolean
  value!: number;

  constructor(private ds: DataService) {}

  ngOnInit(): void {
    this.value =  this.ds.all_input.get(this.url)?.slider_data?.value as number
  }

  isInverted() {
    return this.ds.all_input.get(this.url)?.slider_data?.invert as boolean;
  }

  isMax() {
    return this.ds.all_input.get(this.url)?.slider_data?.max as number;
  }

  isMin() {
    return this.ds.all_input.get(this.url)?.slider_data?.min as number;
  }

  step() {
    return this.ds.all_input.get(this.url)?.slider_data?.step as number;
  }

  isThumbLabel() {
    return this.ds.all_input.get(this.url)?.slider_data?.thumbLabel as boolean;
  }

  isVertical() {
    return this.ds.all_input.get(this.url)?.slider_data?.vertical as boolean;
  }


  detectChange() {
    let m = new MEData();
    m.page = this.ds.dataLookup(this.isSidebar)

    m.key = this.ds.all_input.get(this.url)?.slider_data?.name as string;
    m.value = this.value;
    m.url = this.url

    this.ds.data_setter.emit(m);
    // this.ds.all_input.get(this.url)?.slider_data?.value = this.value
  }
}
