import { ButtonToggleData } from './../../shared/application_data';
import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ButtonToggleInstance, MEData } from '../../shared/application_data';

@Component({
  selector: 'app-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss'],
})
export class ButtonToggleComponent implements OnInit {
  @Input() url!: string;
  @Input() isSidebar!: boolean

  selected_data!: string | string[];
  constructor(public ds: DataService) {}

  ngOnInit(): void {

    if (this.isMultiple()) {
      this.selected_data = [];
    } else {
      this.selected_data = '';
    }




  }

  updateData(selected: any){
    let m = new MEData();
    m.page = this.ds.dataLookup(this.isSidebar)
    m.key = this.ds.all_input.get(this.url)?.button_toggle_data?.name as string;
    m.value = selected
    m.url = this.url
    this.ds.data_setter.emit(m);

    if (this.ds.trueTypeOf(selected) == 'string'){
      for (let d of  this.get_buton_data() as ButtonToggleInstance[]) {
        if (d.name !== selected){
          d.selected = false
        } else {
          d.selected = true
        }
      }
    } else if(this.ds.trueTypeOf(selected) == 'array') {
      for (let d of  this.get_buton_data() as ButtonToggleInstance[]) {
        if (selected.indexOf(d.name) == -1){
          d.selected = false
        } else {
          d.selected = true
        }
      }
    }
  }

  onChange($event: any) {
    this.updateData($event.value)

  }

  isMultiple() {
    return this.ds.all_input.get(this.url)?.button_toggle_data?.multi as boolean;
  }

  get_buton_data() {
    return this.ds.all_input.get(this.url)?.button_toggle_data?.data as ButtonToggleInstance[];
  }

  get_value() {

    if (this.ds.all_input.get(this.url)?.button_toggle_data?.data) {
      let names = [];
      for (let d of this.get_buton_data()) {
        if (d.selected) {
          if (this.isMultiple()) {
            names.push(d.name);
          } else {
            this.selected_data = d.name;
          }
        }
      }

      if (names.length > 0) {
        this.selected_data = names;
      }
    }


    // let key= this.ds.all_input.get(this.url)?.name
    // let lookup = this.ds.dataLookup(this.isSidebar)
    // return this.ds.get_data(lookup, key)
    return this.selected_data
  }
}
