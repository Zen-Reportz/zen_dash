import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MEData } from 'src/app/shared/application_data';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent implements OnInit {
  @Input() url!: string;
  checked = false;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.checked = this.dataService.all_input.get(this.url).toggle_data.checked as boolean;
  }

  saveData(event: any){
    this.update(event.checked)
  }

  update(checked: any) {
    let m = new MEData();
    m.key = this.dataService.all_input.get(this.url).toggle_data.name as string;
    m.value = checked;

    this.dataService.data_setter.emit(m);
  }

  get_name() {
    return this.dataService.all_input.get(this.url).toggle_data.name;
  }
}
