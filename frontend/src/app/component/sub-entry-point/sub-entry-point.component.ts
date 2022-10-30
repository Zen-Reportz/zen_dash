import { CallServiceService } from './../../services/call-service.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import {
  FlexData,
  MultiURLInfo,
  ReactiveData,
  ResponseData,
} from '../../shared/application_data';
import { Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sub-entry-point',
  templateUrl: './sub-entry-point.component.html',
  styleUrls: ['./sub-entry-point.component.scss'],
})
export class SubEntryPointComponent implements OnInit {
  @Input() url!: string;
  @Input() isSidebar!: boolean;

  type: string | undefined;
  name: string | undefined;
  reactive: ReactiveData = new ReactiveData();
  d: Map<string, Subscription> = new Map();
  multi_url!: MultiURLInfo[];
  pageCall: Subscription | undefined;
  data_type = ['box', 'table', 'chart', 'image', 'highchart'];
  loading = true;
  look_up!: string

  constructor(
    private dataService: DataService,
    private callService: CallServiceService
  ) {}

  ngOnInit(): void {
    let p: string =''
    if (this.isSidebar){
      p = 'sidebar'
    } else {
      p = this.dataService.get_page()
    }

    this.look_up =  this.dataService.input_lookup(p, this.url)
    this.getData(true);
  }

  subscribe() {
    if (this.data_type.indexOf(this.type as string) >= 0) {
      this.d.set(
        'refresh',
        this.dataService.refresh.subscribe((t) => {
          this.getData(false);
        })
      );
    }

    if (this.reactive.full_reactive) {
      this.d.set(
        'reactive',
        this.dataService.data_setter.subscribe((t) => {
          if (t.key !== this.name) {
            this.getData(false);
          }
        })
      );
    } else if (this.reactive.reactive_ids.length > 0) {
      this.d.set(
        'specific_reactive',
        this.dataService.data_setter.subscribe((t) => {
          if (this.reactive.reactive_ids.indexOf(t.key) >= 0) {
            this.getData(false);
          }
        })
      );
    }


  }

  unsubscribe() {
    this.d.get('refresh')?.unsubscribe();
    this.d.get('reactive')?.unsubscribe();
    this.d.get('specific_reactive')?.unsubscribe();
  }

  set_name(t: any) {
    switch (t.type) {
      case 'box':
        this.name = t.box_data?.name as string;
        break;
      case 'date':
        this.name = t.date_data?.name as string;
        break;
      case 'table':
        this.name = t.table_data?.name as string;
        break;
      case 'chart':
        this.name = t.chart_data?.name as string;
        break;
      case 'radio':
        this.name = t.radio_data?.name as string;
        break;
      case 'checkbox':
        this.name = t.checkbox_data?.name as string;
        break;
      case 'slider':
        this.name = t.slider_data?.name as string;
        break;
      case 'button_toggle':
        this.name = t.button_toggle_data?.name as string;
        break;
      case 'toggle':
        this.name = t.button_toggle_data?.name as string;
        break;
      case 'multi_list':
        this.multi_url = t.multi_data?.urls as MultiURLInfo[];
        break;
      case 'multi_tabs':
        this.multi_url = t.multi_data?.urls as MultiURLInfo[];
        break;
      case 'multi_expand':
        this.multi_url = t.multi_data?.urls as MultiURLInfo[];
        break;
      case 'simple_filter':
        this.name = t.simple_filter_data?.name;
        break;
      case 'simple_server_filter':
        this.name = t.simple_filter_data?.name;
        break;
      case 'group_filter':
        this.name = t.group_filter_data?.name;
        break;
      case 'input':
        this.name = t.input_data?.name;
        break;
      case 'download':
        break;
      case 'upload':
        break;
      case 'image':
        break;
      case 'highchart':
        break;
      default:
        console.log(t.type);
    }
  }

  getData(page_refreshed: boolean) {
    this.loading = true;
    this.multi_url = [];
    if (this.pageCall !== undefined) {
      this.pageCall.unsubscribe();
    }

    let p = this.callService.call_response(
      this.url,
      undefined,
      undefined
    ) as Observable<ResponseData>;

    if ((page_refreshed) && (this.dataService.all_input.get(this.look_up)!== undefined)) {
        this.loading = false;
        let t = this.dataService.all_input.get(this.look_up)
        this.reactive = t?.reactive as ReactiveData;
        this.set_name(t)
        this.type = t?.type as string;
        this.unsubscribe();
        this.subscribe();
        return
    }

    this.type = undefined
    this.dataService.all_input.delete(this.look_up)
    this.pageCall = p.subscribe({
      next: (t: ResponseData) => {
        this.loading = false;
        this.reactive = t.reactive;
        this.dataService.all_input.set(this.look_up, t);
        this.set_name(t)

        this.type = t.type;
        this.unsubscribe();
        this.subscribe()
      },
      error: (e: any) => {
        console.error(e);
      },
    });
  }

  getURLs() {
    return this.multi_url;
  }

  getName(name: string | undefined) {
    if (!name) {
      return 'Loading';
    } else {
      return name;
    }
  }

  getFlex(original: string, type: string, url: string) {
    let p: string =''
    if (this.isSidebar){
      p = 'sidebar'
    } else {
      p = this.dataService.get_page()
    }

    let look_up =  this.dataService.input_lookup(p, this.url)

    let response: any;
    if (this.dataService.all_input.get(look_up) !== undefined) {
      if (this.dataService.all_input.get(look_up)?.flex !== null) {
        if (type == 'flex') {
          response = this.dataService.all_input.get(look_up)?.flex?.fxFlex;
        } else if (type == 'flex_md') {
          response = this.dataService.all_input.get(look_up)?.flex?.fxFlex_md;
        } else if (type == 'flex_sm') {
          response = this.dataService.all_input.get(look_up)?.flex?.fxFlex_sm;
        } else if (type == 'flex_xs') {
          response = this.dataService.all_input.get(look_up)?.flex?.fxFlex_xs;
        } else {
          console.log(' issue with type for ' + look_up + ' ' + type);
          response = original;
        }
      } else {
        console.log(' issue with type for ' + look_up + ' ' + type);
        response = original;
      }
    } else {
      // console.log("No data so returning original")
      response = original;
    }

    return response;
  }
}
