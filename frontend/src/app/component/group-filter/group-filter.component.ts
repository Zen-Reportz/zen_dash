import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import {
  GroupedFilterDataInstance,
  MEData
} from 'src/app/shared/application_data';

import { AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

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
  @Input() uuid!: string;
  dataForm = new UntypedFormControl();
  multi!: boolean;

  data: GroupedFilterDataInstance[] | undefined;

  public data_select_control: UntypedFormControl = new UntypedFormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public data_search_control: UntypedFormControl = new UntypedFormControl();

  /** list of banks filtered by search keyword */
  public data_search: ReplaySubject<GroupedFilterDataInstance[]> =
    new ReplaySubject<GroupedFilterDataInstance[]>(1);

  @ViewChild('dataSelect', { static: true }) dataSelect!: MatSelect;
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(private dataService: DataService) {}

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
    if (!this.data) {
      return;
    }

    // get the search keyword
    let search = this.data_search_control.value;
    const GroupsCopy = this.copyGroups(this.data);

    if (!search) {
      this.data_search.next(this.data.slice());
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
    this.multi = this.dataService.group_filter_data.get(this.uuid)
      ?.multi as boolean;

    this.data = this.dataService.group_filter_data.get(this.uuid)
      ?.data as GroupedFilterDataInstance[];

    // set initial selection
    this.data_select_control.setValue([]);

    // load the initial bank list
    this.data_search.next(this.data.slice());

    // listen for search field value changes
    this.data_search_control.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterMulti();
      });

    this.setInitialValue();
  }

  getLabel() {
    return this.dataService.group_filter_data.get(this.uuid)?.name;
  }

  detectChange(value: any) {
    let m = new MEData();
    m.key = this.dataService.group_filter_data.get(this.uuid)?.name as string;
    m.value = value.value;

    this.dataService.data_setter.emit(m);
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
