import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from 'src/app/shared/data.service';
import { DateData, MEData } from '../../shared/application_data';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.component.html',
  styleUrls: ['./datetime.component.scss'],
})
export class DatetimeComponent implements OnInit {
  @Input() uuid!: string;

  single!: boolean;
  form_data!: FormGroup;
  form_control!: FormControl;

  data!: DateData;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    if (this.dataService.date_data.has(this.uuid) ){
      this.data = this.dataService.date_data.get(this.uuid) as DateData
      if (this.data.second_date as string) {
        this.single = false;
        this.form_data = new FormGroup({
          start: new FormControl(new Date(this.data.first_date + "T00:00:00")),
          end: new FormControl(new Date(this.data.second_date + "T00:00:00")),
        });

      } else {
        this.single = true;
        this.form_control = new FormControl(new Date(this.data.first_date+ "T00:00:00"));
      }
    }

  }

  getForm() {
    return this.form_data;

  }

  isSingle() {
    return this.single;
  }

  getLabel(){
    return this.dataService.date_data.get(this.uuid)?.name as string
  }

  changeValue(value:any){
    let m = new MEData();
    let push =true
    m.key = this.dataService.date_data.get(this.uuid)?.name as string

    if (this.single) {

      m.value = this.form_control.value.toISOString()
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
