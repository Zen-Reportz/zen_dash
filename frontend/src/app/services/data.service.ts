import { SimpleServerFilterData } from './../shared/application_data';
import { Injectable, EventEmitter } from '@angular/core';
import {
  BoxData,
  ButtonToggleData,
  ChartData,
  CheckboxData,
  DateData,
  DownloadData,
  GroupFilterData,
  InputData,
  MEData,
  RadioData,
  SidebarData,
  SimpleFilterData,
  SliderData,
  TableData,
  ToggleData,
  UploadData,
  DataImage,
  HighChartData,
} from '../shared/application_data';
import { Params, Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  side_data!: SidebarData;

  all_input= new Map<string, any>();

  // radio_data = new Map<string, RadioData>();
  // checkbox_data = new Map<string, CheckboxData>();
  // table_data = new Map<string, TableData>();
  // date_data = new Map<string, DateData>();
  // box_data = new Map<string, BoxData>();
  // chart_data = new Map<string, ChartData>();
  // slider_data = new Map<string, SliderData>();
  // button_toggle_data = new Map<string, ButtonToggleData>();
  // toggle_data = new Map<string, ToggleData>();
  // simple_filter_data = new Map<string, SimpleFilterData>();
  // simple_server_filter_data = new Map<string, SimpleServerFilterData>();
  // group_filter_data = new Map<string, GroupFilterData>();
  // input_filter_data = new Map<string, InputData>();
  // download_data = new Map<string, DownloadData>();
  // upload_data = new Map<string, UploadData>();
  // image_data = new Map<string, DataImage>();
  // highchart_data = new Map<string, HighChartData>();
  sidebar_ids: any[] = ['page'];

  data = new Map<string, any>();

  data_setter = new EventEmitter<MEData>();
  refresh = new EventEmitter<string>();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.data_setter.subscribe((t) => {
      let url = new URL(window.location.href);
      let params = new URLSearchParams(url.search);
      let queryParams: Params = {};
      if (params.get('page') !== null) {
        queryParams = { page: params.get('page') };
      }

      this.router.navigate([], {
        relativeTo: activatedRoute,
        queryParams: {},
      });

      this.data.set(t.key, t.value);
      // this.refresh.emit(t.key)
    });
  }

  get_data(key: string) {
    return this.data.get(key);
  }

  reset_data() {
    this.data.forEach((value: any, key: string) => {
      if (this.sidebar_ids.indexOf(key) < 0) {
        this.data.delete(key);
      }
    });
  }

  get_all() {
    let convMap: any = {};
    this.data.forEach((val: string, key: string) => {
      convMap[key] = val;
    });

    return convMap;
  }

  get_input_data(url:string){
    return this.all_input.get(url)
  }
}
