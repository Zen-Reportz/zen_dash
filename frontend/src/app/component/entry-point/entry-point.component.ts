import { DataService } from 'src/app/services/data.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlexData } from 'src/app/shared/application_data';

@Component({
  selector: 'app-entry-point',
  templateUrl: './entry-point.component.html',
  styleUrls: ['./entry-point.component.scss'],
})
export class EntryPointComponent implements OnInit {
  @Input() url!: string;
  @Input() isSidebar!: boolean

  pulled: boolean = false;
  footer!: string;
  title!: string;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
  }



  getFooter() {
    if (this.dataService.all_input.get(this.url) !== undefined) {
      return this.dataService.all_input.get(this.url).footer
    }
    return false

  }


  getTitle() {
    if (this.dataService.all_input.get(this.url) !== undefined) {
      return this.dataService.all_input.get(this.url).title
    }
    return false

  }


}
