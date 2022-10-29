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
  @Input() isSidebar!: boolean
  constructor(private ds: DataService) {}

  ngOnInit(): void {
  }

  checkData(){
    return this.ds.all_input.get(this.url).toggle_data.checked as boolean;
  }

  saveData(event: any){
    this.update(event.checked)
  }

  update(checked: any) {
    let m = new MEData();
    m.key = this.ds.all_input.get(this.url).toggle_data.name as string;
    m.value = checked;
    m.page = this.ds.dataLookup(this.isSidebar)
    this.ds.data_setter.emit(m);
    this.ds.all_input.get(this.url).toggle_data.checked = checked
  }

  get_name() {
    return this.ds.all_input.get(this.url).toggle_data.name;
  }
}
