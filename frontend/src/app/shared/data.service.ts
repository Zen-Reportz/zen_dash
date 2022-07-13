import { Injectable, EventEmitter } from '@angular/core';
import { BoxData, ButtonToggleData, ChartData, CheckboxData, DateData, MEData, RadioData, SidebarData, SliderData, TableData, ToggleData } from './application_data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  side_data!: SidebarData
  radio_data = new Map<string, RadioData>();
  checkbox_data = new Map<string, CheckboxData>();
  table_data = new Map<string, TableData>();
  date_data = new Map<string, DateData>();
  box_data = new Map<string, BoxData>();
  chart_data = new Map<string, ChartData>();
  slider_data = new Map<string, SliderData>();
  button_toggle_data = new Map<string, ButtonToggleData>();
  toggle_data = new Map<string, ToggleData>();

  data = new Map<string, any >();

  data_setter = new EventEmitter< MEData >();
  refresh = new EventEmitter< string >();


  constructor() {
    this.data_setter.subscribe( (t) => {
      this.data.set(t.key, t.value)
      // this.refresh.emit(t.key)
    })


   }


}
