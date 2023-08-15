import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CallServiceService } from 'src/app/services/call-service.service';
import { DataService } from 'src/app/services/data.service';
import {
  ButtonFAB,
  MEData,
  UpdateReturnData,
} from 'src/app/shared/application_data';
import { LoadingComponent } from '../loading/loading.component';
import { ApiCallService } from 'src/app/services/api-call.service';

@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss'],
})
export class FabButtonComponent implements OnInit {
  @Input() url!: string;
  isSidebar = false;
  show: boolean = false;
  look_up!: string;
  page!: string;
  second_call: any;

  constructor(
    private ds: DataService,
    private callService: CallServiceService,
    private _snackBar: MatSnackBar,
    private api: ApiCallService
  ) {}


  ngOnInit(): void {
    this.look_up = this.api.lookup(this.isSidebar, this.url);
    this.page = this.ds.get_page();
    let pull = this.api.needToPull(this.isSidebar, this.url, this.page);
    this.api.call_this.emit({
      forced: pull,
      url: this.url,
      look_up: this.look_up,
      page: this.page,
      isSidebar: this.isSidebar,
    });
  }

  get_type() {
    return this.ds.all_input.get(this.look_up)?.floating_button_data?.fab_style;
  }

  get_color() {
    return this.ds.all_input.get(this.look_up)?.floating_button_data?.color;
  }

  get_style() {
    return this.ds.all_input.get(this.look_up)?.floating_button_data?.style;
  }

  get_icon() {
    return this.ds.all_input.get(this.look_up)?.floating_button_data?.icon;
  }

  reactiveity(type: string, value: string = '') {
    let m = new MEData();
    m.page = this.ds.dataLookup(false);
    m.key = (this.ds.all_input.get(this.look_up)?.floating_button_data?.name as string) + '_' + type;

    if (value === '') {
      m.value = this.ds.makeid(2);
    } else {
      m.value = value;
    }

    m.url = this.url + '_' + type;
    this.ds.data_setter.emit(m);
  }

  trigger() {
    this.reactiveity('triggered');

    if (this.ds.all_input.get(this.look_up)?.floating_button_data?.redirect) {
      window.open(this.ds.all_input.get(this.look_up)?.floating_button_data?.url,
      this.ds.all_input.get(this.look_up)?.floating_button_data?.target_attribute);
      return;
    } else {
      if (this.second_call !== undefined) {
        this.second_call.unsubscribe();
      }
    }

    let p = this.callService.second_call_response(
      this.ds.all_input.get(this.look_up)?.floating_button_data?.url as string,
      this.ds.all_input.get(this.look_up)?.floating_button_data?.name as string,
      ''
    );

    this.second_call = p.subscribe(
      (res) => {
        try {
          var tt = res as UpdateReturnData;
          this.reactiveity('result', tt.button_result);
          this._snackBar.openFromComponent(LoadingComponent, {
            duration: (tt.display?.duration as number) * 1000,
            data: {
              message: tt.display?.message,
              status: tt.display?.status,
            },
          });
          this.reactiveity('success');
          this.show = false;
        } catch {
          this._snackBar.openFromComponent(LoadingComponent, {
            duration: 5000,
            data: { message: 'backend failed', status: 'error' },
          });
        }
      },
      (error) => {
        this.show = false;
        this.reactiveity('failed');
        this._snackBar.openFromComponent(LoadingComponent, {
          duration: 5 * 1000,
          data: { message: 'API called Failed', status: 'error' },
        });
      }
    );
  }
}
