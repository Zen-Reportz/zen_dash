import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ButtonToggleInstance } from '../../shared/application_data';

@Component({
  selector: 'app-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss'],
})
export class ButtonToggleComponent implements OnInit {
  @Input() uuid!: string;
  selected_data!: string | string[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    if (this.dataService.button_toggle_data.get(this.uuid)?.multi) {
      this.selected_data = [];
    } else {
      this.selected_data = '';
    }

    if (this.dataService.button_toggle_data.get(this.uuid)?.data) {
      let names = [];
      for (let d of this.dataService.button_toggle_data.get(this.uuid)
        ?.data as ButtonToggleInstance[]) {
        if (d.selected) {
          if (this.dataService.button_toggle_data.get(this.uuid)?.multi) {
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

  onChange($event: any) {
    this.selected_data = $event.value;
  }

  isMultiple() {
    return this.dataService.button_toggle_data.get(this.uuid)?.multi as boolean;
  }

  get_data() {
    return this.dataService.button_toggle_data.get(this.uuid)
      ?.data as ButtonToggleInstance[];
  }
}
