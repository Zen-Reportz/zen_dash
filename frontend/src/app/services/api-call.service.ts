import { CallInfo, MultiURLInfo, ReactiveData, ResponseReturn } from './../shared/application_data';
import { EventEmitter, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CallServiceService } from './call-service.service';
import { DataService } from './data.service';
import { ResponseData } from '../shared/application_data';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  input_types = ["date",
    "checkbox",
    "radio",
    "simple_filter",
    "simple_server_filter",
    "group_filter",
    "slider",
    "button_toggle",
    "toggle",
    "input",
    "download",
    "upload",
    "button",
    "form"]

  subscription_lookup: any = {}
  d: Map<string, Subscription> = new Map();
  data_type = ['box', 'table', 'chart', 'image', 'highchart', 'custom_html'];
  call_this = new EventEmitter<CallInfo>()
  call_api = {}

  constructor(
    private ds: DataService,
    private callService: CallServiceService,
    public dialog: MatDialog
  ) {
    this.call_this.subscribe((ct) => {
      this.getData(ct.forced, ct.url, ct.look_up, ct.page, ct.isSidebar)
    })

  }

  get_multi_url(t: any){

    let multi_url: MultiURLInfo[] = []
    switch (t.type) {
      case 'multi_list':
        multi_url = t.multi_data?.urls as MultiURLInfo[];
        break;
      case 'multi_tabs':
        multi_url = t.multi_data?.urls as MultiURLInfo[];
        break;
      case 'multi_expand':
        multi_url = t.multi_data?.urls as MultiURLInfo[];
        break;
      default:
        multi_url = []
    }
    return multi_url
  }

  set_name(t: any) {
    let name: string = ''
    switch (t.type) {
      case 'box':
        name = t.box_data?.name as string;
        break;
      case 'date':
        name = t.date_data?.name as string;
        break;
      case 'table':
        name = t.table_data?.name as string;
        break;
      case 'chart':
        name = t.chart_data?.name as string;
        break;
      case 'radio':
        name = t.radio_data?.name as string;
        break;
      case 'checkbox':
        name = t.checkbox_data?.name as string;
        break;
      case 'slider':
        name = t.slider_data?.name as string;
        break;
      case 'button_toggle':
        name = t.button_toggle_data?.name as string;
        break;
      case 'toggle':
        name = t.button_toggle_data?.name as string;
        break;
      case 'simple_filter':
        name = t.simple_filter_data?.name;
        break;
      case 'simple_server_filter':
        name = t.simple_filter_data?.name;
        break;
      case 'group_filter':
        name = t.group_filter_data?.name;
        break;
      case 'input':
        name = t.input_data?.name;
        break;
      case 'custom_html':
        name = t.custom_html?.name
        break
      default:
        name = ''
    }

    return name
  }


  async getData(forced:boolean, url:string, look_up: string, page:string, isSidebar:boolean) {
    let t = this.ds.all_input.get(look_up)
    if (t !== undefined && !forced) {
      this.ds.input_emitter.emit({"calling": false, "lookup": look_up, "t": t, "message": undefined})
      // console.log("No call" + url + look_up)
      return
    }

    if (this.input_types.includes(t?.type as string)){
      this.ds.input_emitter.emit({"calling": false, "lookup": look_up, "t": t, "message": undefined})
      return
    }


    if (this.subscription_lookup[look_up] !== undefined) {
      // console.log("unscribring it"+ url + look_up)
      this.subscription_lookup[look_up].unsubscribe();
    }

    let p = this.callService.call_response(
      url,
      undefined,
      undefined
    ) as Observable<ResponseData>;

    this.ds.input_emitter.emit({"calling": true, "lookup": look_up, "t": undefined, "message": undefined})
    // console.log("calling" + url + look_up)
    this.ds.all_input.delete(look_up);
    this.subscription_lookup[look_up] =  await p.subscribe({
      next: (t: ResponseData) => {
        this.saveData(isSidebar, url, page)
        let reactive = t?.reactive as ReactiveData;
        let type = t?.type as string;
        let name = this.set_name(t)

        this.unsubscribe(look_up);
        this.subscribe(type, look_up, url, reactive, name, page, isSidebar);
        this.ds.all_input.set(look_up, t);
        this.ds.input_emitter.emit({"calling": false, "lookup": look_up, "t": t, "message": undefined})
        // console.log("called" + url + look_up)
        return
      },
      error: (e: Error) => {
        // this.ds.input_emitter[look_up].emit(undefined)
        this.ds.input_emitter.emit({"calling": false, "lookup": look_up, "t": undefined, "message": e.message})
        // console.log("errored" + url + look_up)
        return
      },
    });

    return {"error": "not called"}
  }


  unsubscribe(look_up: string) {
    this.d.get('refresh_' + look_up,)?.unsubscribe();
    this.d.get('reactive_' + look_up,)?.unsubscribe();
    this.d.get('specific_reactive_' + look_up,)?.unsubscribe();
  }

  callGetData(look_up: string, url:string, page:string, t:string, isSidebar: boolean){
    let current_page= this.ds.get_page()
    if (current_page === page){
      let force = false
      if (t === "PageRefresh"){
        force = true
      } else if(t === "RefreshButton"){
        force = true
      } else if (t === "AutoRefresh"){
        force = true
      } else if (t === "Reactive"){
        force = true
      } else if (t === "SpecificReactive"){
        force = true
      } else {
        return
      }
      this.getData(force, url, look_up, page, isSidebar);

    }
  }

  subscribe(type: string, look_up: string, url:string, reactive: ReactiveData, name: string, page:string, isSidebar:boolean) {
    if (this.data_type.indexOf(type as string) >= 0) {
      this.d.set(
        'refresh_' + look_up,
        this.ds.refresh.subscribe((t) => {
          this.callGetData(look_up, url, page, t, isSidebar)
        })
      );
    }

    if (reactive.full_reactive) {
      this.d.set(
        'reactive_' + look_up,
        this.ds.data_setter.subscribe((t) => {
          if (t.key !== name) {
            this.callGetData(look_up, url, page, "Reactive", isSidebar)
          }
        })
      );
    } else if (reactive.reactive_ids.length > 0) {
      this.d.set(
        'specific_reactive_' + look_up,
        this.ds.data_setter.subscribe((t) => {
          if (reactive.reactive_ids.indexOf(t.key) >= 0) {
            this.callGetData(look_up, url, page, "SpecificReactive", isSidebar)
          }
        })
      );
    }
  }

  lookup(isSidebar: boolean, url:string){
    let p: string = '';
    if (isSidebar) {
      p = 'sidebar';
    } else {
      p = this.ds.get_page();
    }

    let look_up = this.ds.input_lookup(p, url);
    return look_up
  }


  needToPull(isSidebar: boolean, url:string, page:string) {


    let look_up = this.lookup(isSidebar, url)
    let pull = false;
    let d = sessionStorage.getItem(look_up);
    let dd = {
      global: this.ds.data['global'],
      page: this.ds.data[page],
    }
    try {
      delete dd["page"][look_up]
      if (Object.keys(dd["page"]).length === 0){
        delete dd["page"]
      }

    }catch {

    }

    let current_data = JSON.stringify(dd);

    if (d !== null) {
      if (current_data !== d) {
        pull = true;
      }
    } else {
      pull = true;
    }

    return pull;
  }

  saveData(isSidebar: boolean, url:string, page:string){
    let look_up = this.lookup(isSidebar, url)
    let dd = {
      global: this.ds.data['global'],
      page: this.ds.data[page],
    }
    try {
      delete dd["page"][look_up]
      if (Object.keys(dd["page"]).length === 0){
        delete dd["page"]
      }

    }catch {

    }


    let current_data = JSON.stringify(dd);
    // console.log(current_data)
    // console.log(this.ds.get_all())
    sessionStorage.setItem(look_up, current_data);

  }
}
