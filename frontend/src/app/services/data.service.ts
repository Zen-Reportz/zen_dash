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
