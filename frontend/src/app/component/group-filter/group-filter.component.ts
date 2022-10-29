import { GroupFilterData } from './../../shared/application_data';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import {
  GroupedFilterDataInstance,
  MEData
} from 'src/app/shared/application_data';

import { ViewChild } from '@angular/core';

import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-group-filter',
  templateUrl: './group-filter.component.html',
  styleUrls: ['./group-filter.component.scss'],
})
export class GroupFilterComponent implements OnInit {
  @Input() url!: string;
  @Input() isSidebar!: boolean
  dataForm = new UntypedFormControl();
  multi!: boolean;

  group_data: GroupedFilterDataInstance[] | undefined;
  data!: GroupFilterData

  public data_select_control: UntypedFormControl = new UntypedFormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public data_search_control: UntypedFormControl = new UntypedFormControl();

  /** list of banks filtered by search keyword */
  public data_search: ReplaySubject<GroupedFilterDataInstance[]> =
    new ReplaySubject<GroupedFilterDataInstance[]>(1);

  @ViewChild('dataSelect', { static: true }) dataSelect!: MatSelect;
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(private ds: DataService) {}

  ngOnInit(): void {
    this.myData();
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
    if (!this.group_data) {
      return;
    }

    // get the search keyword
    let search = this.data_search_control.value;
    const GroupsCopy = this.copyGroups(this.group_data);

    if (!search) {
      this.data_search.next(this.group_data.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.data_search.next(
      GroupsCopy.filter((g) => {
        const showGroup = g.group_name.toLowerCase().indexOf(search) > -1;
        if (!showGroup) {
          g.group_data = g.group_data.filter(
            (g1) => g1.toLowerCase().indexOf(search) > -1
          );
        }
        return g.group_data.length > 0;
      })
    );
  }

  myData() {
    this.data = this.ds.all_input.get(this.url).group_filter_data

    this.multi = this.ds.all_input.get(this.url).group_filter_data.multi as boolean;

    this.group_data = this.data.data as GroupedFilterDataInstance[];

    // set initial selection
    let selected = this.ds.all_input.get(this.url).group_filter_data.selected
    if ((selected !== undefined) && (selected.length > 0)){
      if (this.ds.all_input.get(this.url).group_filter_data.multi){
        this.data_select_control.setValue(selected);
      } else {
        this.data_select_control.setValue(selected[0]);
      }

    }

    // load the initial bank list
    this.data_search.next(this.group_data.slice());

    // listen for search field value changes
    this.data_search_control.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterMulti();
      });

    this.setInitialValue();
  }

  getLabel() {
    return this.ds.all_input.get(this.url).group_filter_data.name;
  }

  detectChange(value: any) {
    let m = new MEData();
    m.key = this.ds.all_input.get(this.url).group_filter_data.name as string;
    m.value = value.value;
    m.page = this.ds.dataLookup(this.isSidebar)


    this.ds.data_setter.emit(m);
    if (this.isMulti()){
      this.ds.all_input.get(this.url).group_filter_data.selected = value.value
    } else {
      this.ds.all_input.get(this.url).group_filter_data.selected = [value.value]
    }
  }
  isMulti(){
    return this.ds.all_input.get(this.url).group_filter_data.multi as boolean;
  }

  protected copyGroups(group: GroupedFilterDataInstance[]) {
    let groupsCopy: GroupedFilterDataInstance[] = [];
    group.forEach((g) => {
      groupsCopy.push({
        group_name: g.group_name,
        group_data: g.group_data.slice(),
      });
    });
    return groupsCopy;
  }
}
