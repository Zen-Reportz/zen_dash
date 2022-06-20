import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MEData } from 'src/app/shared/data';
import { DataService } from 'src/app/shared/data.service';
import { DateData } from '../application_data';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.component.html',
  styleUrls: ['./datetime.component.scss'],
})
export class DatetimeComponent implements OnInit {
  @Input() url!: string;
  single!: boolean;
  data!: DateData;
  form_data!: FormGroup;
  form_control!: FormControl;

  constructor(private http: HttpClient, private dataService: DataService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.http
      .post<DateData>(location.origin + this.url, this.dataService.data)
      .subscribe((t) => {
        this.data = t;
        if (this.data.second_date !== null) {

          this.single = false;
          this.form_data = new FormGroup({
            start: new FormControl(new Date(this.data.first_date+ "T00:00:00")),
            end: new FormControl(new Date(this.data.second_date+ "T00:00:00")),
          });

        } else {
          this.single = true;
          this.form_control = new FormControl(new Date(this.data.first_date+ "T00:00:00"));
        }
      });
  }

  getLabel() {
    return this.data && this.data.label ? this.data.label : 'Loading';
  }

  getForm() {
    if (this.data) {
      return this.form_data;
    } else {
      return new FormGroup({});
    }
  }

  dataPresent() {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  isSingle() {
    return this.single;
  }

  changeValue(value:any){
    let m = new MEData();
    let push =true
    m.key = this.data.name

    if (this.single) {

      m.value = [this.form_control.value.toISOString()]
    } else {
      if ((this.form_data.value.end) && (this.form_data.value.start)){
        m.value = [this.form_data.value.start.toISOString(), this.form_data.value.end.toISOString() ]
      } else {
        push = false
      }
    }
    if (push){
      this.dataService.data_setter.emit(m)
    }


  }
}
