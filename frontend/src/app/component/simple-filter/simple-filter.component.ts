import { Component, Input, OnInit } from '@angular/core';
import { FormControl, UntypedFormControl } from '@angular/forms';
import { MEData, SimpleFilterData } from 'src/app/shared/application_data';
import { DataService } from 'src/app/shared/data.service';

import { AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-simple-filter',
  templateUrl: './simple-filter.component.html',
  styleUrls: ['./simple-filter.component.scss']
})
export class SimpleFilterComponent implements OnInit {
  @Input() uuid!: string
  dataForm = new FormControl();
  multi!: boolean


  //
  /** list of banks */
  protected banks: Bank[] = BANKS;

  /** control for the selected bank for multi-selection */
  public bankMultiCtrl: UntypedFormControl = new FormControl<any>;

  /** control for the MatSelect filter keyword multi-selection */
  public bankMultiFilterCtrl: UntypedFormControl = new UntypedFormControl();

  /** list of banks filtered by search keyword */
  public filteredBanksMulti: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();


  constructor(private dataService: DataService) { }


  ngOnInit(): void {
    this.multi = this.dataService.simple_filter_data.get(this.uuid)?.multi as boolean

    this.bankMultiCtrl.setValue(this.banks[10]);

    // load the initial bank list
    this.bankMultiFilterCtrl.next(this.banks.slice());

    // listen for search field value changes
    this.bankMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanksMulti();
      });

  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.filteredBanksMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: Bank, b: Bank) => a && b && a.id === b.id;
      });
  }


  protected filterBanksMulti() {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search = this.bankMultiFilterCtrl.value;
    if (!search) {
      this.filteredBanksMulti.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanksMulti.next(
      this.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }



  myData(){
    let t = this.dataService.simple_filter_data.get(this.uuid) as SimpleFilterData
    return t.data

  }


  getLabel(){
    return this.dataService.simple_filter_data.get(this.uuid)?.name
  }



  detectChange(value:any){
    let m = new MEData();
    m.key = this.dataService.simple_filter_data.get(this.uuid)?.name as string
    m.value = value.value


    this.dataService.data_setter.emit(m)
  }


}




export interface Bank {
  id: string;
  name: string;
}

export interface BankGroup {
  name: string;
  banks: Bank[];
}


/** list of banks */
export const BANKS: Bank[] = [
  {name: 'Bank A (Switzerland)', id: 'A'},
  {name: 'Bank B (Switzerland)', id: 'B'},
  {name: 'Bank C (France)', id: 'C'},
  {name: 'Bank D (France)', id: 'D'},
  {name: 'Bank E (France)', id: 'E'},
  {name: 'Bank F (Italy)', id: 'F'},
  {name: 'Bank G (Italy)', id: 'G'},
  {name: 'Bank H (Italy)', id: 'H'},
  {name: 'Bank I (Italy)', id: 'I'},
  {name: 'Bank J (Italy)', id: 'J'},
  {name: 'Bank Kolombia (United States of America)', id: 'K'},
  {name: 'Bank L (Germany)', id: 'L'},
  {name: 'Bank M (Germany)', id: 'M'},
  {name: 'Bank N (Germany)', id: 'N'},
  {name: 'Bank O (Germany)', id: 'O'},
  {name: 'Bank P (Germany)', id: 'P'},
  {name: 'Bank Q (Germany)', id: 'Q'},
  {name: 'Bank R (Germany)', id: 'R'}
];

/** list of bank groups */
export const BANKGROUPS: BankGroup[] = [
  {
    name: 'Switzerland',
    banks: [
      {name: 'Bank A', id: 'A'},
      {name: 'Bank B', id: 'B'}
    ]
  },
  {
    name: 'France',
    banks: [
      {name: 'Bank C', id: 'C'},
      {name: 'Bank D', id: 'D'},
      {name: 'Bank E', id: 'E'},
    ]
  },
  {
    name: 'Italy',
    banks: [
      {name: 'Bank F', id: 'F'},
      {name: 'Bank G', id: 'G'},
      {name: 'Bank H', id: 'H'},
      {name: 'Bank I', id: 'I'},
      {name: 'Bank J', id: 'J'},
    ]
  },
  {
    name: 'United States of America',
    banks: [
      {name: 'Bank Kolombia', id: 'K'},
    ]
  },
  {
    name: 'Germany',
    banks: [
      {name: 'Bank L', id: 'L'},
      {name: 'Bank M', id: 'M'},
      {name: 'Bank N', id: 'N'},
      {name: 'Bank O', id: 'O'},
      {name: 'Bank P', id: 'P'},
      {name: 'Bank Q', id: 'Q'},
      {name: 'Bank R', id: 'R'}
    ]
  }
];
