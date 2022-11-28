import { DataService } from 'src/app/services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import {
  Component,
  ViewChild,
  ElementRef,
  Input, OnInit,Output, EventEmitter
} from '@angular/core';
@Component({
  selector: 'app-custom-html',
  templateUrl: './custom-html.component.html',
  styleUrls: ['./custom-html.component.scss'],
})
export class CustomHtmlComponent implements OnInit {
  @Input() url!: string;


  htmlStr: any
  cssStr: any
  cssHide: boolean = true
  @ViewChild('css', { static: false }) cssSelect!: ElementRef;


  constructor(private ds: DataService, protected sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.htmlStr = this.sanitizer.bypassSecurityTrustHtml(this.ds.all_input.get(this.url)?.custom_html_data?.html as string)
  }

}
