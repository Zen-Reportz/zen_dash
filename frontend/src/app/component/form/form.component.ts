import { FormCustomData, MEData } from './../../shared/application_data';
import { Component, Input, OnInit } from '@angular/core';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { DataService } from 'src/app/services/data.service';
import { CallServiceService } from 'src/app/services/call-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() url!: string;

  data!: FormCustomData
  formData!: any
  call: any


  show = false
  renderers = [
    ...angularMaterialRenderers,
  ]
  constructor(private ds: DataService,
    private callService: CallServiceService,
    private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.data = this.ds.all_input.get(this.url)?.form_data as FormCustomData;
    this.formData = this.data.data

  }

  reactiveity(type: string){
    let m = new MEData();
    m.page = this.ds.dataLookup(false);
    m.key = this.ds.all_input.get(this.url)?.form_data?.name as string + "_" +type
    m.value = this.ds.makeid(2);
    m.url = this.url+ "_" +type;
    this.ds.data_setter.emit(m);
  }

  trigger(){
    let m = new MEData();
    m.page = this.ds.dataLookup(false)
    m.url = this.url
    m.key = this.data.name as string;
    m.value = this.formData;
    this.show = true
    this.ds.data_setter.emit(m);
    // console.log(m)
    this.reactiveity("triggered")

    let p = this.callService.call_response(this.data.submit_info.url, undefined,
      undefined);
    this.call = p.subscribe(
      (res) => {
        this.reactiveity("success")

        this._snackBar.openFromComponent(LoadingComponent, {
          duration: 5 * 1000,
          data: { message: 'API called Sucessfully ', status: 'success' },
        });


        this.show = false

      },
      (error) => {
        this.reactiveity("failed")

        this.show = false
        this._snackBar.openFromComponent(LoadingComponent, {
          duration: 5 * 1000,
          data: { message: 'API called Failed', status: 'error' },
        });
      }
    )
  }

}
