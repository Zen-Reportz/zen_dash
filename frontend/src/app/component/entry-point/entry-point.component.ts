import { DataService } from 'src/app/services/data.service';
import { Component, Input, OnInit } from '@angular/core';

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
    let p: string =''
    if (this.isSidebar){
      p = 'sidebar'
    } else {
      p = this.dataService.get_page()
    }

    let look_up =  this.dataService.input_lookup(p, this.url)

    if (this.dataService.all_input.get(look_up) !== undefined) {
      return this.dataService.all_input.get(look_up)?.footer
    }
    return false

  }


  getTitle() {
    let p: string =''
    if (this.isSidebar){
      p = 'sidebar'
    } else {
      p = this.dataService.get_page()
    }

    let look_up =  this.dataService.input_lookup(p, this.url)

    if (this.dataService.all_input.get(look_up) !== undefined) {
      return this.dataService.all_input.get(look_up)?.title
    }
    return false

  }


}
