import { WebsocketService } from './../../services/websocket.service';
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
  constructor(private ds: DataService, private websocket: WebsocketService) {}

  c_this(data:ResponseData, ds:DataService, lookup_url:string){
    ds.all_input.set(lookup_url, data)
  }

  ngOnDestroy(): void {
    // let p = this.ds.get_page()
    // this.websocket.close(p)
  }

  ngOnInit(): void {
    if (this.ds.all_input.get(this.url)?.websocket_url !== undefined) {
      let url = this.ds.all_input.get(this.url)?.websocket_url as string
      let p = this.ds.get_page()
      this.websocket.connect(url, p, this.c_this, this.url)
    }
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
