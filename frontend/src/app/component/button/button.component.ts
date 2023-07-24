import { ButtonData, MEData, UpdateReturnData } from './../../shared/application_data';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { CallServiceService } from 'src/app/services/call-service.service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() url!: string;
  data!: ButtonData;
  myFiles: File[] = [];
  show: boolean = false
  second_call: any
  constructor( private ds: DataService,
    private callService: CallServiceService,
    private _snackBar: MatSnackBar) { }

  reactiveity(type: string, value: string = ""){
    let m = new MEData();
    m.page = this.ds.dataLookup(false);
    m.key = this.ds.all_input.get(this.url)?.button_data?.name as string + "_" +type

    if (value === ""){
      m.value = this.ds.makeid(2);
    } else {
      m.value = value
    }

    m.url = this.url + "_" +type;
    this.ds.data_setter.emit(m);

  }

  ngOnInit(): void {
    this.data = this.ds.all_input.get(this.url)?.button_data as ButtonData;
  }

  trigger(){

    this.reactiveity("triggered")

    if (this.data.redirect){
      console.log(this.data.url)
      window.open(this.data.url, "_black")
      return
    }
    else {
      if (this.second_call !== undefined) {
        this.second_call.unsubscribe();
      }

    }


    let p = this.callService.second_call_response(this.data.url, this.data.name, '');
    this.second_call = p.subscribe(
      (res) => {
        try {
          var tt = res as UpdateReturnData
          this.reactiveity("result", tt.button_result)
          this._snackBar.openFromComponent(LoadingComponent, {
            duration: tt.display?.duration as number*1000,
            data: { message: tt.display?.message, status: tt.display?.status },
          });
          this.reactiveity("success")
          this.show = false
        } catch {
          this._snackBar.openFromComponent(LoadingComponent, {
            duration: 5000,
            data: { message: "backend failed", status: 'error' },
          });

        }



      },
      (error) => {
        this.show = false
        this.reactiveity("failed")
        this._snackBar.openFromComponent(LoadingComponent, {
          duration: 5 * 1000,
          data: { message: 'API called Failed', status: 'error' },
        });
      }
    );
  }

}
