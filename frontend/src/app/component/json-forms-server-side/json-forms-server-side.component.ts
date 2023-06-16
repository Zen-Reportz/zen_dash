import {debounceTime, finalize, tap} from 'rxjs/operators';
import {switchMap} from 'rxjs/operators';
import {delay} from 'rxjs/operators';
import {of} from 'rxjs';
import {AutocompleteControlRenderer} from '@jsonforms/angular-material';
import {Observable} from 'rxjs';
import {Component} from '@angular/core';
import { CallServiceService } from 'src/app/services/call-service.service';
import { JsonFormsAngularService } from '@jsonforms/angular';
import { UpdateReturnData } from 'src/app/shared/application_data';


@Component({
  selector: 'app-json-forms-server-side',
  templateUrl: './json-forms-server-side.component.html',
  styleUrls: ['./json-forms-server-side.component.scss']
})
export class JsonFormsServerSideComponent extends AutocompleteControlRenderer {
  url: string = ''
  name: string = ''

  constructor(private callService: CallServiceService, jsonformsService: JsonFormsAngularService){
    super(jsonformsService);
  }
  fetchSuggestions = (input: string): Observable<UpdateReturnData> => {
    let p = this.callService.second_call_response(this.url, this.name, input);
    return p;
  };

  isLoading: boolean = false

  override ngOnInit() {
    super.ngOnInit();

    this.url =  this.scopedSchema["url" as keyof typeof this.scopedSchema]
    this.name =  this.scopedSchema["search_name" as keyof typeof this.scopedSchema]
    this.form.valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this.fetchSuggestions(value)
          .pipe(
            finalize(() => this.isLoading = false)
          )
        )
      )
      .subscribe((options: UpdateReturnData) => this.options = options.simple_fitler_data as string[]);
  }
}
