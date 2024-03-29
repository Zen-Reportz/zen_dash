import { CheckboxData } from './../../shared/application_data';
import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { CheckboxInstance, MEData } from '../../shared/application_data';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @Input() url!: string;
  @Input() isSidebar!: boolean
  // name!: string;
  // data!: CheckboxData
  constructor(public ds: DataService) {}

  ngOnInit(): void {
      this.getData()
  }

  getData(){
    return this.ds.all_input.get(this.url)?.checkbox_data as CheckboxData
  }

  update() {


    let m = new MEData();
    m.page = this.ds.dataLookup(this.isSidebar)
    m.url = this.url
    m.key = this.getData().name as string;
    m.value = this.getData().data;

    this.ds.data_setter.emit(m);
  }

  get_style() {
    return this.getData().style;
  }

  my_data() {
    return this.getData().data as CheckboxInstance[];
  }
}
