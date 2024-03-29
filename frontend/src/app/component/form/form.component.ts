import { FormCustomData, MEData, UpdateReturnData } from './../../shared/application_data';
import { Component, Input, OnInit } from '@angular/core';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { DataService } from 'src/app/services/data.service';
import { CallServiceService } from 'src/app/services/call-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingComponent } from '../loading/loading.component';
import { and, createAjv, isControl, optionIs, rankWith, schemaTypeIs, scopeEndsWith, Tester, schemaMatches } from '@jsonforms/core';
import { JsonFormsServerSideComponent } from '../json-forms-server-side/json-forms-server-side.component';
import { MatDialog } from '@angular/material/dialog';
import { SupportDialogComponent } from '../support-dialog/support-dialog.component';
import { ApiCallService } from 'src/app/services/api-call.service';
const serverTester: Tester = and(
  schemaTypeIs('string'),
  schemaMatches(schema => schema.hasOwnProperty('url'))

  );


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
    { tester: rankWith(5, serverTester), renderer: JsonFormsServerSideComponent },

  ]
  constructor(private ds: DataService,
    private callService: CallServiceService,
    private _snackBar: MatSnackBar,
    public _dialog: MatDialog,
    public api_call_service: ApiCallService
    ) {}

  ngOnInit(): void {
    this.data = this.ds.all_input.get(this.url)?.form_data as FormCustomData;
    this.formData = this.data.data

  }


  open_dialog(tt: UpdateReturnData){
    let dialogRef = this._dialog.open(SupportDialogComponent, {
      width: tt?.display_dialog?.width,
      height: tt?.display_dialog?.height,
      data: {custom_html: tt?.display_dialog?.custom_message}
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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

    let p = this.callService.second_call_response(this.data.submit_info.url, undefined,
      undefined);
    this.call = p.subscribe(
      (res) => {
        // console.log(res)
        let r = res as UpdateReturnData
        let duration = r.display?.duration as number
        let isMessage = !((r.display?.message === undefined) ||(r.display?.message === null))
        let message = 'API called Sucessfully '
        if (isMessage){
          message = r.display?.message as string
        }
        let staus = r.display?.status as string
        this._snackBar.openFromComponent(LoadingComponent, {
          duration: duration * 1000,
          data: { message: message, status: staus },
        });
        if (r.display_dialog !== undefined){
          this.open_dialog(r)
        }

        if (r.ui_data !== undefined){
          this.api_call_service.saveUIData(r.ui_data)
        }
        this.reactiveity("success")

        if (r.response_form_data != undefined){
          // window.open(r.response_form_data.redirect_url);
          window.location.href = r.response_form_data.redirect_url
        }

        this.show = false

      },
      (error) => {
        this.reactiveity("failed")
        let duration = error.error.display?.duration as number
        if (duration === undefined) {
          duration = 5
        }

        let isMessage = !((error.error.display?.message === undefined) ||(error.error.display?.message === null))
        let message = 'API called Failed'
        if (isMessage){
          message = error.error.display?.message as string
        }

        this.show = false
        this._snackBar.openFromComponent(LoadingComponent, {
          duration: duration * 1000,
          data: { message: 'API called Failed', status: 'error' },
        });
      }
    )
  }

}
