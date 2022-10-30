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
      if (t.page !== 'global'){
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

  save_instance(){

  }

  save_default() {
    for (const [url, value] of Object.entries(this.data['global'])) {
      if (url !== "page"){
        let d: any = value
        let dd = this.all_input.get(url)
        console.log(dd)
      }
    }
  }
}
