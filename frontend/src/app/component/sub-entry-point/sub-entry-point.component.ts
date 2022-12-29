import { CallServiceService } from './../../services/call-service.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  DialogData,
  FlexData,
  MultiURLInfo,
  ReactiveData,
  ResponseData,
  ResponseReturn,
  ToolTipData,
} from '../../shared/application_data';
import { Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiCallService } from 'src/app/services/api-call.service';
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
  loading = true;
  look_up!: string;
  tooltip_data: ToolTipData | undefined
  dialog_data: DialogData | undefined


  failed = false

  constructor(
    private ds: DataService,
    private callService: CallServiceService,
    private clipboard: Clipboard,
    public dialog: MatDialog,
    private api: ApiCallService
  ) {}


  ngOnInit(): void {
    this.look_up = this.api.lookup(this.isSidebar, this.url)
    this.ds.input_emitter.subscribe((rr:ResponseReturn) => {
      if (rr.lookup !== this.look_up){
        return
      }
      if (rr.message !== undefined){
        this.loading = true;
        this.failed = true
        this.error = rr.message
        this.tooltip_data = undefined
        this.dialog_data = undefined
        this.name = undefined
        this.type = undefined
      } else if (rr.calling){
        this.loading = true;
        this.failed = false
        this.tooltip_data = undefined
        this.dialog_data = undefined
        this.name = undefined
        this.type = undefined
      } else {
        let t = rr.t as ResponseData
        this.loading = false
        this.failed = false
        this.tooltip_data = t?.tooltip_data
        this.dialog_data = t?.dialog_data
        this.reactive = t?.reactive
        this.fd.emit(t.flex);
        this.rd.emit(this.reactive)
        this.name = this.api.set_name(t);
        this.type = t?.type as string;
        this.multi_url = this.api.get_multi_url(t)
      }

    })

    let pull = this.api.needToPull(this.isSidebar, this.url);
    this.api.call_this.emit({"page_refreshed": pull, "forced": false, "url": this.url, "look_up": this.look_up})

  }


  getURLs() {
    return this.multi_url;
  }

  // getName(name: string | undefined) {
  //   if (!name) {
  //     return 'Loading';
  //   } else {
  //     return name;
  //   }
  // }

  setFlex(url: string, flexData: FlexData) {
    this.flexData.set(url, flexData);
  }

  setReactivity(url: string, reactiveData: ReactiveData) {
    this.reactivityData.set(url, reactiveData);
  }

  // getToolTipLabel(){
  //   return this.tooltip_data?.label ?? ''
  // }

  copy_error(){
    this.clipboard.copy(this.error);
  }

  force_refresh(){
    this.api.getData(false, true, this.url, this.look_up);

  }


  openDialog(){

    if (this.dialog_data){
      const dialogRef = this.dialog.open(DialogComponent, {
        height: this.dialog_data.height,
        width: this.dialog_data.width,
        data: this.dialog_data.url,
      });
    }
  }


}
