import { FlexData, ReactiveData } from './../../shared/application_data';
import { DataService } from 'src/app/services/data.service';
import { ElementRef, ViewChild, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-entry-point',
  templateUrl: './entry-point.component.html',
  styleUrls: ['./entry-point.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
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
  @ViewChild('script') script!: ElementRef;


  constructor(public ds: DataService, private cd: ChangeDetectorRef) {}

//   convertToScript() {
//     var element = this.script.nativeElement;
//     var script = document.createElement("script");
//     script.type = "text/javascript";
//     script.src = "https://cdnjs.cloudflare.com/ajax/libs/angular-smart-table/2.1.11/smart-table.min.js";

//     var parent = element.parentElement;
//     parent.parentElement.replaceChild(script, parent);
// }


  ngOnInit(): void {


    // const script = this.renderer.createElement('script');
    // this.renderer.setAttribute(script, 'src', 'https://cdnjs.cloudflare.com/ajax/libs/angular-smart-table/2.1.11/smart-table.min.js');
    // this.renderer.appendChild(document.head, script);


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
    // this.convertToScript()
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
    return ''

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
