import {AutocompleteControlRenderer} from '@jsonforms/angular-material';
import {Observable} from 'rxjs';
import {Component} from '@angular/core';
import { CallServiceService } from 'src/app/services/call-service.service';
import { JsonFormsAngularService } from '@jsonforms/angular';
import { UpdateReturnData } from 'src/app/shared/application_data';
import { ApiCallService } from 'src/app/services/api-call.service';


@Component({
  selector: 'app-json-forms-server-side',
  templateUrl: './json-forms-server-side.component.html',
  styleUrls: ['./json-forms-server-side.component.scss']
})
export class JsonFormsServerSideComponent extends AutocompleteControlRenderer {
  url: string = ''
  name: string = ''
  current_value: string = ''

  constructor(private callService: CallServiceService,
    jsonformsService: JsonFormsAngularService,
    public api_call_service: ApiCallService
    ){
    super(jsonformsService);
  }
  fetchSuggestions = (input: string): Observable<UpdateReturnData> | Observable<unknown> => {
    let p = this.callService.second_call_response(this.url, this.name, input);
    return p;
  };

  isLoading: boolean = false

  override ngOnInit() {
    super.ngOnInit();

    this.url =  this.scopedSchema["url" as keyof typeof this.scopedSchema]
    this.name =  this.scopedSchema["search_name" as keyof typeof this.scopedSchema]

    this.form.valueChanges.subscribe(x => {
      if (x !== this.current_value){

        this.current_value = x
        this.fetchSuggestions(x).subscribe(
          (options) => {
            let d = options as UpdateReturnData
            this.options = d.simple_fitler_data as string[]

            if (d.ui_data !== undefined){
              this.api_call_service.saveUIData(d.ui_data)
            }
          }
        )
      }
      })

  }
}
