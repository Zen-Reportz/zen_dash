import {
  ButtonToggleData,
  CheckboxData,
  DateData,
  GroupFilterData,
  InputData,
  RadioData,
  SimpleFilterData,
  SimpleServerFilterData,
  SliderData,
  ToggleData,
} from './../shared/application_data';
import { Injectable, EventEmitter } from '@angular/core';
import { MEData, ResponseData, SidebarData } from '../shared/application_data';
import { Params, Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  side_data!: SidebarData;

  all_input = new Map<string, ResponseData>();

  data: any = {};

  data_setter = new EventEmitter<MEData>();
  refresh = new EventEmitter<string>();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.data_setter.subscribe((t) => {
      let page = this.get_page();
      let queryParams: Params = {};
      queryParams = { page: page[0] };

      this.router.navigate([], {
        relativeTo: activatedRoute,
        queryParams: {},
      });
      if (this.data[t.page] === undefined) {
        this.data[t.page] = {};
      }

      this.data[t.page][t.url] = [t.key, t.value];
      if (t.page !== 'global') {
        this.data[t.page]['need_to_refresh'] = true;
      }

      console.log(this.data);
    });
  }

  get_page() {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    let page = 'page_0';
    if (params.get('page') !== null) {
      page = params.get('page') as string;
    } else {
      page = 'page_0';
    }

    return page;
  }

  get_data(page: string, key: string) {
    if (this.data[page] !== undefined) {
      return this.data[page][key];
    }
    return undefined;
  }

  get_all() {
    let convMap: any = {};

    let global = this.data['global'] ?? {};
    Object.entries(global).forEach(([key, value]) => (convMap[key] = value));

    let page = this.get_page();
    let page_data = this.data[page[0]] ?? {};
    Object.entries(page_data).forEach(([key, value]) => (convMap[key] = value));

    return convMap;
  }

  get_input_data(url: string) {
    return this.all_input.get(url);
  }

  set_data(page: string, key: string, value: any) {
    if (this.data[page] === undefined) {
      this.data[page] = {};
    }
    this.data[page][key] = value;
  }

  input_lookup(page: string, url: string) {
    return url + '--' + page;
  }

  trueTypeOf(obj: any) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  }

  dataLookup(isSidebar: boolean) {
    if (isSidebar) {
      return 'global';
    } else {
      return this.get_page();
    }
  }

  save_instance(input_data: ResponseData, value: any, url: string) {
    switch (input_data.type) {
      case 'date':
        let date_data = input_data.date_data as DateData;
        if (date_data.second_date as string) {
          date_data.first_date = value[0];
          date_data.second_date = value[1];
        } else {
          date_data.first_date = value;
        }
        input_data.date_data = date_data;
        this.all_input.set(url, input_data);

        break;
      case 'radio':
        let radio_data = input_data.radio_data as RadioData;
        radio_data.selected = value;
        input_data.radio_data = radio_data;
        this.all_input.set(url, input_data);
        break;
      case 'checkbox':
        let checkbox_data = input_data.checkbox_data as CheckboxData;
        checkbox_data.data = value;
        input_data.checkbox_data = checkbox_data;
        this.all_input.set(url, input_data);
        break;
      case 'slider':
        let slider_data = input_data.slider_data as SliderData;
        slider_data.value = value;
        input_data.slider_data = slider_data;
        this.all_input.set(url, input_data);
        break;
      case 'button_toggle':
        let button_toggle = input_data.button_toggle_data as ButtonToggleData;
        if (button_toggle.multi) {
          for (let d of button_toggle.data) {
            if (value.indexOf(d.name) === -1) {
              d.selected = false;
            } else {
              d.selected = true;
            }
          }
        } else {
          for (let d of button_toggle.data) {
            if (d.name === value) {
              d.selected = true;
            } else {
              d.selected = false;
            }
          }
        }
        input_data.button_toggle_data = button_toggle;
        this.all_input.set(url, input_data);

        break;
      case 'toggle':
        let toggle_data = input_data.toggle_data as ToggleData;
        toggle_data.checked = value;
        input_data.toggle_data = toggle_data;
        this.all_input.set(url, input_data);

        break;
      // case 'multi_list':
      //   this.multi_url = input_data.multi_data?.urls as MultiURLInfo[];
      //   break;
      // case 'multi_tabs':
      //   this.multi_url = input_data.multi_data?.urls as MultiURLInfo[];
      //   break;
      // case 'multi_expand':
      //   this.multi_url = input_data.multi_data?.urls as MultiURLInfo[];
      //   break;
      case 'simple_filter':
        let simple_filter_data =
          input_data.simple_filter_data as SimpleFilterData;
        if (simple_filter_data.multi) {
          simple_filter_data.selected = value;
        } else {
          simple_filter_data.selected = [value];
        }
        input_data.simple_filter_data = simple_filter_data;
        this.all_input.set(url, input_data);

        break;
      case 'simple_server_filter':
        let simple_server_filter =
          input_data.simple_server_filter_data as SimpleServerFilterData;
        if (simple_server_filter.multi) {
          simple_server_filter.selected = value;
        } else {
          simple_server_filter.selected = [value];
        }
        input_data.simple_server_filter_data = simple_server_filter;
        this.all_input.set(url, input_data);
        break;
      case 'group_filter':
        let group_filer = input_data.group_filter_data as GroupFilterData;
        if (group_filer.multi) {
          group_filer.selected = value;
        } else {
          group_filer.selected = [value];
        }
        input_data.group_filter_data = group_filer;
        this.all_input.set(url, input_data);
        break;
      case 'input':
        let input = input_data.input_data as InputData;
        input.value = value;
        input_data.input_data = input;
        this.all_input.set(url, input_data);

        break;
      // case 'download':
      //   break;
      // case 'upload':
      //   break;
      // case 'image':
      //   break;
      // case 'highchart':
      //   break;
      default:
        console.log(input_data.type);
    }
  }

  save_default() {
    for (const [url, value] of Object.entries(this.data['global'])) {
      if (url !== 'page') {
        let d: any = value;
        let dd = this.all_input.get(url) as ResponseData;
        this.save_instance(dd, d[1], url);
      }
    }
    let page = this.get_page();
    for (const [url, value] of Object.entries(this.data[page])) {
      if (url !== 'need_to_refresh') {
        let d: any = value;
        console.log(d);
        let dd = this.all_input.get(url) as ResponseData;
        this.save_instance(dd, d[1], url);
      }
    }
  }
}
