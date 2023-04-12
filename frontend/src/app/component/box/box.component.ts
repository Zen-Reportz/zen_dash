import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ResponseData, UpdateReturnData } from 'src/app/shared/application_data';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
})
export class BoxComponent implements OnInit, OnDestroy {
  @Input() url!: string;
  constructor(private ds: DataService) {}

  ngOnDestroy(): void {
  }

  ngOnInit(): void {

  }



  getIcon() {
    return this.ds.all_input.get(this.url)?.box_data?.icon as string;
  }

  getValue() {
    return this.ds.all_input.get(this.url)?.box_data?.value;
  }

  getName() {
    return this.ds.all_input.get(this.url)?.box_data?.name;
  }
}
