import { CallServiceService } from './../../services/call-service.service';
import {
  HighChartData,
  SimpleServerFilterData,
} from './../../shared/application_data';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  // @Output() pulled = new EventEmitter<boolean>();
  // @Output() footer = new EventEmitter<string>();
  // @Output() title = new EventEmitter<string>();

  // @Output() fxFlex = new EventEmitter<FlexData>();
  // @Output() hidden = new EventEmitter<boolean>();

  // title: string | undefined
  type: string | undefined;
  name: string | undefined;
  reactive: ReactiveData = new ReactiveData();
  d: Map<string, Subscription> = new Map();
  multi_url!: MultiURLInfo[];
  pageCall: Subscription | undefined;
  data_type = ['box', 'table', 'chart', 'image', 'highchart'];
  loading = true;
  size_data = new Map<string, FlexData>();
  constructor(
    private dataService: DataService,
    private callService: CallServiceService
  ) {}

  ngOnInit(): void {
    this.getData(true);
  }

  subscribe() {
    if (this.data_type.indexOf(this.type as string) >= 0) {
      this.d.set(
        'refresh',
        this.dataService.refresh.subscribe((t) => {
          console.log("refresh " + this.type)
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

    if ((page_refreshed) && (this.dataService.all_input.get(this.url)!== undefined)) {
        this.loading = false;
        let t = this.dataService.all_input.get(this.url)
        this.reactive = t.reactive;
        this.set_name(t)
        // this.pulled.emit(true);
        // this.title.emit(t.title);
        // if (t.flex !== undefined) {
        //   this.fxFlex.emit(t.flex);
        // }

        this.type = t.type;
        // this.footer.emit(t.footer);
        // this.hidden.emit(this.reactive.hidden)

        this.unsubscribe();
        this.subscribe();
        return
    }

    this.type = undefined
    this.dataService.all_input.delete(this.url)
    this.pageCall = p.subscribe({
      next: (t: ResponseData) => {
        this.loading = false;
        this.reactive = t.reactive;
        this.dataService.all_input.set(this.url, t);
        this.set_name(t)

        if (this.isSidebar) {
          this.dataService.sidebar_ids.push(this.name);
        }

        // this.pulled.emit(true);
        // this.title.emit(t.title);
        // if (t.flex !== undefined) {
        //   this.fxFlex.emit(t.flex);
        // }

        this.type = t.type;
        // this.footer.emit(t.footer);
        // this.hidden.emit(this.reactive.hidden)

        this.unsubscribe();
        this.subscribe();
      },
      error: (e: any) => {
        console.error(e);
        // this.subscribe();
      },
    });
  }

  // getTitle() {
  //   return this.title ? this.title : undefined;
  // }

  // getFooter() {
  //   return this.footer ? this.footer : undefined;
  // }

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

  setFlex(flex: FlexData, url: string) {
    if (flex !== null) {
      this.size_data.set(url, flex);
    }
  }

  getFlex(original: string, type: string, url: string) {
    let response: any;
    if (this.size_data.get(url)?.fxFlex !== undefined) {
      if (this.size_data.get(url)?.fxFlex !== null) {
        if (type == 'flex') {
          response = this.size_data.get(url)?.fxFlex;
        } else if (type == 'flex_md') {
          response = this.size_data.get(url)?.fxFlex_md;
        } else if (type == 'flex_sm') {
          response = this.size_data.get(url)?.fxFlex_sm;
        } else if (type == 'flex_xs') {
          response = this.size_data.get(url)?.fxFlex_xs;
        } else {
          console.log(' issue with type for ' + url + ' ' + type);
          response = original;
        }
      } else {
        console.log(' issue with type for ' + url + ' ' + type);
        response = original;
      }
    } else {
      // console.log("No data so returning original")
      response = original;
    }

    return response;
  }
}
