import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MEData, ResponseData } from 'src/app/shared/application_data';

import { ViewChild } from '@angular/core';

import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import {
  take,
  takeUntil,
} from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-simple-filter',
  templateUrl: './simple-filter.component.html',
  styleUrls: ['./simple-filter.component.scss'],
})
export class SimpleFilterComponent implements OnInit {
  @Input() url!: string;
  @Input() isSidebar!: boolean
  dataForm = new UntypedFormControl();

  data: string[] | undefined;
  dataUrl: string | undefined;
  // dataCall: Subscription | undefined;
  compareFn = (a:any, b:any) => a && b && a.id === b.id;


  public data_select_control: UntypedFormControl = new UntypedFormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public data_search_control: UntypedFormControl = new UntypedFormControl();

  /** list of banks filtered by search keyword */
  public data_search: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  public searching = false;

  @ViewChild('dataSelect', { static: true }) dataSelect!: MatSelect;
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();



  constructor(
    private ds: DataService,
  ) {}

  ngOnInit(): void {
    this.originalData();
    this.searchData();
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.data_search.pipe(take(1), takeUntil(this._onDestroy)).subscribe(() => {
      this.dataSelect.compareWith = (a: string, b: string) => a === b;
    });
  }

  protected filterMulti() {
    if (!this.data) {
      return;
    }
    // get the search keyword
    let search = this.data_search_control.value;
    if (!search) {
      this.data_search.next(this.data.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.data_search.next(
      this.data.filter((data) => data.toLowerCase().indexOf(search) > -1)
    );
  }

  selectedData(){
    return this.ds.all_input.get(this.url)?.simple_filter_data?.selected as string[]
  }

  isMulti(){
    return this.ds.all_input.get(this.url)?.simple_filter_data?.multi as boolean;
  }

  originalData() {

    this.data = this.ds.all_input.get(this.url)?.simple_filter_data?.data as string[];

    // set initial selection

    if ((this.selectedData() !== undefined) && (this.selectedData().length > 0)){
      if (this.isMulti()){
        this.data_select_control.setValue(this.selectedData());
      } else {
        this.data_select_control.setValue(this.selectedData()[0]);
      }

    }


    // load the initial bank list
    this.data_search.next(this.data.slice());
  }

  searchData() {
    this.data_search_control.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterMulti();
      });

    this.setInitialValue();
  }


  getLabel() {
    return this.ds.all_input.get(this.url)?.simple_filter_data?.name;
  }

  detectChange(value: any) {
    let m = new MEData();
    m.key = this.ds.all_input.get(this.url)?.simple_filter_data?.name as string;
    m.value = value.value;
    m.page = this.ds.dataLookup(this.isSidebar)
    m.url = this.url

    this.ds.data_setter.emit(m);
    // if (this.isMulti()){
    //   this.ds.all_input.get(this.url)?.simple_filter_data?.selected = value.value
    // } else {
    //   this.ds.all_input.get(this.url)?.simple_filter_data?.selected = [value.value]
    // }
  }


}
