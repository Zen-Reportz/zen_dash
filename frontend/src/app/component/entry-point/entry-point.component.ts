import { FlexData, ReactiveData } from './../../shared/application_data';
import { DataService } from 'src/app/services/data.service';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-entry-point',
  templateUrl: './entry-point.component.html',
  styleUrls: ['./entry-point.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryPointComponent implements OnInit, AfterViewInit {
  @Input() url!: string;
  @Input() isSidebar!: boolean
  @Output() fx = new EventEmitter<FlexData>();
  @Output() rd = new EventEmitter<ReactiveData>();

  pulled: boolean = false;
  footer!: string;
  title!: string;
  look_up!: string;

  constructor(public ds: DataService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    let p: string =''
    if (this.isSidebar){
      p = 'sidebar'
    } else {
      p = this.ds.get_page()
    }

    this.look_up =  this.ds.input_lookup(p, this.url)
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges()
  }


  getFooter() {


    if (this.ds.all_input.get(this.look_up) !== undefined) {
      return this.ds.all_input.get(this.look_up)?.footer
    }
    return false

  }


  getTitle() {
    if (this.ds.all_input.get(this.look_up) !== undefined) {
      return this.ds.all_input.get(this.look_up)?.title
    }
    return false

  }



  get_lookup_url(){
    let page = this.ds.get_page();
    let p: string = '';
    if (this.isSidebar) {
      p = 'sidebar';
    } else {
      p = this.ds.get_page();
    }

    this.look_up = this.ds.input_lookup(p, this.url);
  }

}
