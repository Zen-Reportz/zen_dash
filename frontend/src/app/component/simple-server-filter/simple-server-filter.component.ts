import { CallServiceService } from './../../services/call-service.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, UntypedFormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
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

@Component({
  selector: 'app-simple-server-filter',
  templateUrl: './simple-server-filter.component.html',
  styleUrls: ['./simple-server-filter.component.scss'],
})
export class SimpleServerFilterComponent implements OnInit {
  @Input() url!: string;
  @Input() isSidebar!: boolean
  multi: boolean = false;
  data!: string[];
  server_url!: string;
  name!: string;

  compareFn = (a: any, b: any) => a && b && a.id === b.id;

  /** list of banks */
  protected items: string[] = [];

  /** control for the selected bank for server side filtering */
  public ServerSideCtrl: UntypedFormControl = new UntypedFormControl();

  /** control for filter for server side. */
  public ServerSideFilteringCtrl: UntypedFormControl = new UntypedFormControl();

  /** indicate search operation is in progress */
  public searching = false;

  /** list of banks filtered after simulating server side search */
  public filteredServerSideBanks: ReplaySubject<string[]> = new ReplaySubject<
    string[]
  >(1);

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(
    private ds: DataService,
    private callService: CallServiceService
  ) {}

  ngOnInit() {
    this.originalData();

    // listen for search field value changes
    this.ServerSideFilteringCtrl.valueChanges
      .pipe(
        filter((search) => !!search),
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
        let p = this.pullData(search);

        p.subscribe(
          (data) => {
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
          (error) => {
            // no errors in our simulated example
            this.searching = false;
            // handle error...
          }
        );
      });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  selectedData(){
    return this.ds.all_input.get(this.url)?.simple_server_filter_data?.selected as string[]
  }
  isMulti(){
    return this.ds.all_input.get(this.url)?.simple_server_filter_data?.multi as boolean;
  }

  originalData() {

    let d = this.ds.all_input.get(this.url)?.simple_server_filter_data?.data as string[];

    d = d.concat(this.selectedData())
    this.data = [... new Set(d)]
    this.name = this.ds.all_input.get(this.url)?.simple_server_filter_data?.name as string;

    this.server_url = this.ds.all_input.get(this.url)?.simple_server_filter_data?.url as string;


    if ((this.selectedData() !== undefined) && (this.selectedData().length > 0)){
      if (this.isMulti()){

        this.ServerSideCtrl.setValue(this.selectedData());
      } else {
        this.ServerSideCtrl.setValue(this.selectedData()[0]);
      }

    }

    // load the initial bank list
    this.filteredServerSideBanks.next(this.data.slice());
  }

  pullData(value: string) {
    let p = this.callService.second_call_response(this.server_url, this.name, value);
    return p;
  }

  detectChange(value: any) {
    let m = new MEData();
    m.key = this.ds.all_input.get(this.url)?.simple_server_filter_data?.name as string;
    m.value = value.value;
    m.page = this.ds.dataLookup(this.isSidebar)
    m.url = this.url

    this.ds.data_setter.emit(m);
  }

}
