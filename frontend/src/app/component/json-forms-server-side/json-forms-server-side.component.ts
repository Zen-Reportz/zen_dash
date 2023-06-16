import {AutocompleteControlRenderer} from '@jsonforms/angular-material';
import {Component} from '@angular/core';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { CallServiceService } from './../../services/call-service.service';
import { FormControl, UntypedFormControl } from '@angular/forms';
import {
  debounceTime,
  delay,
  tap,
  filter,
  map,
  takeUntil,
} from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { MEData } from 'src/app/shared/application_data';
import { JsonFormsAngularService } from '@jsonforms/angular';

@Component({
  selector: 'app-json-forms-server-side',
  templateUrl: './json-forms-server-side.component.html',
  styleUrls: ['./json-forms-server-side.component.scss']
})
export class JsonFormsServerSideComponent extends AutocompleteControlRenderer {


  isLoading: boolean = true;
  server_url: string =''
  multi = false
  name = ''
  compareFn = (a:any, b:any) => a && b && a.id === b.id;

  protected items: string[] = [];
  public ServerSideCtrl: UntypedFormControl = new UntypedFormControl();
  public ServerSideFilteringCtrl: UntypedFormControl = new UntypedFormControl();
  public searching = false;
  public filteredServerSideBanks: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  protected _onDestroy = new Subject<void>();

  constructor(private callService: CallServiceService, jsonformsService: JsonFormsAngularService){
    super(jsonformsService);
  }
  override ngOnInit(): void {

    super.ngOnInit();
    this.server_url = this.scopedSchema["url" as keyof typeof this.scopedSchema]
    this.multi = this.scopedSchema["multi" as keyof typeof this.scopedSchema] === "true" || false
    this.name = this.scopedSchema["search_name" as keyof typeof this.scopedSchema]
    // console.log(this.data)
    // console.log(this.id)
    // console.log(this.disabled)
    // console.log(this.visible)
    // console.log(this.subscription)
    // console.log(this.label)
    // console.log(this.description)
    // console.log(this.error)
    // console.log(this.scopedSchema)
    // console.log(this.rootSchema)
    // console.log(this.enabled)
    // console.log(this.hidden)
    // console.log(this.propsPath)
    // this.form.valueChanges
    //   .pipe(
    //     debounceTime(300),
    //     tap(() => this.isLoading = true),
    //     switchMap(value => fetchSuggestions(value)
    //       .pipe(
    //         finalize(() => this.isLoading = false)
    //       )
    //     )
    //   )
    //   .subscribe((options: string[]) => this.options = options);

    this.ServerSideFilteringCtrl.valueChanges
      .pipe(
        filter((search: string) => !!search),
        tap(() => (this.searching = true)),
        takeUntil(this._onDestroy),
        debounceTime(200),
        map((search) => {
          if (!this.items || !search) {
            return [];
          }

          return search;
        }),
        takeUntil(this._onDestroy)
      )
      .subscribe((search) => {
        // create new object instances
        let p = this.pullData(search as string);

        p.subscribe(
          (data: any) => {
            this.searching = false;
            let selected = this.ServerSideCtrl.value

            let new_data = data.simple_fitler_data as string[]

            let final_data: string[]
            if (selected !== null){
              final_data = new_data.concat(selected)
            } else {
              final_data = new_data
            }



            this.filteredServerSideBanks.next(
              final_data
            );
          },
          (error: any) => {
            // no errors in our simulated example
            this.searching = false;
            console.log(error)
            // handle error...
          }
        );
      });
  }
  isMulti(){
    return this.multi
  }

  pullData(value: string) {
    let p = this.callService.second_call_response(this.server_url, this.name, value);
    return p;
  }
}
