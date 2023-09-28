import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { DateData, MEData } from '../../shared/application_data';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.component.html',
  styleUrls: ['./datetime.component.scss'],
})
export class DatetimeComponent implements OnInit {
  @Input() url!: string;
  @Input() isSidebar!: boolean;

  single!: boolean;
  form_data!: UntypedFormGroup;
  form_control!: UntypedFormControl;

  data!: DateData;

  constructor(private ds: DataService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.data = this.ds.all_input.get(this.url)?.date_data as DateData;
    let first_date = this.data.first_date
    if (!this.data.first_date.includes("T")){
        first_date = this.data.first_date+ 'T00:00:00'
    }
    if (this.data.second_date) {
      this.single = false;
      let second_date = this.data.second_date
      if (!this.data.second_date.includes("T")){
        second_date = this.data.second_date+ 'T00:00:00'
      }

      this.form_data = new UntypedFormGroup({
        start: new UntypedFormControl(new Date(first_date)),
        end: new UntypedFormControl(new Date(second_date)),
      });
    } else {
      this.single = true;
      this.form_control = new UntypedFormControl(new Date(first_date));
    }
  }

  getForm() {
    return this.form_data;
  }

  isSingle() {
    return this.single;
  }

  getLabel() {
    return this.data.name as string;
  }

  changeValue(value: any) {
    let m = new MEData();
    let push = true;
    m.key = this.data.name as string;
    m.url = this.url
    m.page = this.ds.dataLookup(this.isSidebar);

    if (this.single) {
      m.value = this.form_control.value.toISOString().substring(0, 10)
      m.page = this.ds.dataLookup(this.isSidebar);

    } else {
      if (this.form_data.value.end && this.form_data.value.start) {
        m.value = [
          this.form_data.value.start.toISOString().substring(0, 10),
          this.form_data.value.end.toISOString().substring(0, 10),
        ];
      } else {
        push = false;
      }
    }
    if (push) {
      this.ds.data_setter.emit(m);
    }
  }
}
