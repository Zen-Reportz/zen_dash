import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MEData } from 'src/app/shared/application_data';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent implements OnInit {
  @Input() uuid!: string;
  checked = false;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.checked = this.dataService.toggle_data.get(this.uuid)?.checked as boolean;
  }

  update() {
    let m = new MEData();
    m.key = this.dataService.toggle_data.get(this.uuid)?.name as string;
    m.value = this.checked;

    this.dataService.data_setter.emit(m);
  }

  get_name() {
    return this.dataService.toggle_data.get(this.uuid)?.name;
  }
}
