import { ButtonData, MEData } from './../../shared/application_data';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { CallServiceService } from 'src/app/services/call-service.service';
import { UUID } from 'angular2-uuid';
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

  ngOnInit(): void {
    this.data = this.ds.all_input.get(this.url)?.button_data as ButtonData;
  }

  trigger(){


    if (this.second_call !== undefined) {
      this.second_call.unsubscribe();
    }


    let p = this.callService.second_call_response(this.data.url, this.data.name, '');
    this.second_call = p.subscribe(
      (res) => {
        this._snackBar.openFromComponent(LoadingComponent, {
          duration: 5 * 1000,
          data: { message: 'API called Sucessfully ', status: 'sucess' },
        });
        let m = new MEData();
        m.page = this.ds.dataLookup(false);
        m.key = this.ds.all_input.get(this.url)?.upload_data?.name as string
        m.value = UUID.UUID();
        m.url = this.url;
        this.ds.data_setter.emit(m);

        this.show = false

      },
      (error) => {
        this.show = false
        this._snackBar.openFromComponent(LoadingComponent, {
          duration: 5 * 1000,
          data: { message: 'API called Failed', status: 'error' },
        });
      }
    );
    console.log("called nme")
  }

}
