import { CallServiceService } from './../../services/call-service.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  DialogData,
  FlexData,
  MultiURLInfo,
  ReactiveData,
  ResponseData,
  ToolTipData,
} from '../../shared/application_data';
import { Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sub-entry-point',
  templateUrl: './sub-entry-point.component.html',
  styleUrls: ['./sub-entry-point.component.scss'],
})
export class SubEntryPointComponent implements OnInit {
  @Input() url!: string;
  @Input() isSidebar!: boolean;
  @Output() rd = new EventEmitter<ReactiveData>();
  @Output() fd = new EventEmitter<FlexData>();

  reactivityData = new Map<string, ReactiveData>();
  flexData = new Map<string, FlexData>();
  error!: string

  type: string | undefined;
  name: string | undefined;
  reactive: ReactiveData = new ReactiveData();
  d: Map<string, Subscription> = new Map();
  multi_url!: MultiURLInfo[];
  pageCall: Subscription | undefined;
  data_type = ['box', 'table', 'chart', 'image', 'highchart', 'custom_html'];
  loading = true;
  look_up!: string;
  tooltip_data: ToolTipData | undefined
  dialog_data: DialogData | undefined


  failed = false

  constructor(
    private ds: DataService,
    private callService: CallServiceService,
    private clipboard: Clipboard,
    public dialog: MatDialog
  ) {}

  needToPull() {
    let page = this.ds.get_page();
    let p: string = '';
    if (this.isSidebar) {
      p = 'sidebar';
    } else {
      p = this.ds.get_page();
    }

    this.look_up = this.ds.input_lookup(p, this.url);
    let pull = false;
    let d = sessionStorage.getItem(this.look_up);
    let current_data = JSON.stringify({
      global: this.ds.data['global'],
      page: this.ds.data[page],
    });

    if (d !== null) {
      if (current_data !== d) {
        pull = true;
        sessionStorage.setItem(this.look_up, current_data);
      }
    } else {
      pull = true;
      sessionStorage.setItem(this.look_up, current_data);
    }

    return pull;
  }

  ngOnInit(): void {
    let pull = this.needToPull();

    this.getData(pull, false);
  }

  subscribe() {
    if (this.data_type.indexOf(this.type as string) >= 0) {
      this.d.set(
        'refresh',
        this.ds.refresh.subscribe((t) => {
          this.needToPull();
          this.getData(true, t);
        })
      );
    }

    if (this.reactive.full_reactive) {
      this.d.set(
        'reactive',
        this.ds.data_setter.subscribe((t) => {
          if (t.key !== this.name) {
            this.needToPull();
            this.getData(true, false);
          }
        })
      );
    } else if (this.reactive.reactive_ids.length > 0) {
      this.d.set(
        'specific_reactive',
        this.ds.data_setter.subscribe((t) => {
          if (this.reactive.reactive_ids.indexOf(t.key) >= 0) {
            this.needToPull();
            this.getData(true, false);
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
      case 'custom_html':
        console.log("hi")
        this.name = t.custom_html?.name
        break
      case 'download':
        break;
      case 'upload':
        break;
      case 'image':
        break;
      case 'highchart':
        break;
      case 'iframe':
        break;
      default:
        console.log(t.type);
    }
  }

  getData(page_refreshed: boolean, forced:boolean) {
    // console.log(`pull is ${page_refreshed} at ${this.url} ${this.ds.get_page()}`)

    this.loading = true;
    this.failed = false
    this.multi_url = [];
    if (this.pageCall !== undefined) {
      this.pageCall.unsubscribe();
    }

    let p = this.callService.call_response(
      this.url,
      undefined,
      undefined
    ) as Observable<ResponseData>;

    if (!page_refreshed && this.ds.all_input.get(this.look_up) !== undefined && !forced) {
      // console.log(`not pulling at ${this.url} ${this.ds.get_page()}`)
      // console.log(`force is ${forced}`)
      this.loading = false;
      let t = this.ds.all_input.get(this.look_up)
      this.tooltip_data = t?.tooltip_data
      this.dialog_data = t?.dialog_data
      this.reactive = t?.reactive as ReactiveData;
      this.set_name(t);
      this.type = t?.type as string;
      this.unsubscribe();
      this.subscribe();
      return;
    }
    // console.log(`${this.ds.all_input.get(this.look_up)} at ${this.url} ${this.ds.get_page()}`)
    // console.log(`pulling at ${this.url} ${this.ds.get_page()}`)
    this.type = undefined;
    this.ds.all_input.delete(this.look_up);
    this.pageCall = p.subscribe({
      next: (t: ResponseData) => {
        this.loading = false;
        this.reactive = t.reactive;
        this.rd.emit(this.reactive);

        this.fd.emit(t.flex);
        this.ds.all_input.set(this.look_up, t);
        this.set_name(t);

        this.tooltip_data = t.tooltip_data
        this.dialog_data = t.dialog_data

        this.type = t.type;
        this.unsubscribe();
        this.subscribe();
      },
      error: (e: Error) => {
        this.failed = true
        this.error = e.message
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

  setFlex(url: string, flexData: FlexData) {
    this.flexData.set(url, flexData);
  }

  setReactivity(url: string, reactiveData: ReactiveData) {
    this.reactivityData.set(url, reactiveData);
  }

  getToolTipLabel(){
    return this.tooltip_data?.label ?? ''
  }

  copy_error(){
    this.clipboard.copy(this.error);
  }

  force_refresh(){

    this.getData(false, true);
  }


  openDialog(){

    if (this.dialog_data){
      const dialogRef = this.dialog.open(DialogComponent, {
        height: this.dialog_data.height,
        width: this.dialog_data.width,
        data: this.dialog_data.url,
      });
    } else {
      console.log("nothing to do")
    }
  }


}
