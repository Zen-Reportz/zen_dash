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
  selected_data!: string | string[];
  data!: ButtonToggleData
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.data = this.dataService.all_input.get(this.url).button_toggle_data

    if (this.data.multi) {
      this.selected_data = [];
    } else {
      this.selected_data = '';
    }



    if (this.data) {
      let names = [];
      for (let d of this.data.data as ButtonToggleInstance[]) {
        if (d.selected) {
          if (this.data.multi) {
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

  }

  updateData(selected: any){
    let m = new MEData();
    m.key = this.data.name as string;
    m.value = selected
    this.dataService.data_setter.emit(m);
  }

  onChange($event: any) {
    this.updateData($event.value)

  }

  isMultiple() {
    return this.data.multi as boolean;
  }

  get_data() {
    return this.data.data as ButtonToggleInstance[];
  }
}
