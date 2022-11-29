import { DataService } from 'src/app/services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import {
  Component,
  ViewChild,
  ElementRef,
  Input, OnInit,Output, EventEmitter, Renderer2, Inject
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-custom-html',
  templateUrl: './custom-html.component.html',
  styleUrls: ['./custom-html.component.scss'],
})
export class CustomHtmlComponent implements OnInit {
  @Input() url!: string;


  htmlStr: any
  cssStr: any
  scriptStr: any

  // cssHide: boolean = true
  // @ViewChild('css', { static: false }) cssSelect!: ElementRef;


  constructor(private ds: DataService, protected sanitizer: DomSanitizer,     private renderer: Renderer2, @Inject(DOCUMENT) private document: HTMLDocument
) { }

  ngOnInit(): void {

    this.htmlStr = this.sanitizer.bypassSecurityTrustHtml(this.ds.all_input.get(this.url)?.custom_html_data?.html as string)
    if (this.ds.all_input.get(this.url)?.custom_html_data?.script !== undefined){
      const script = this.renderer.createElement("script");
      this.renderer.setProperty(
        script,
        "text",
        this.ds.all_input.get(this.url)?.custom_html_data?.script
      );
      this.renderer.appendChild(this.document.body, script);
    }


  }

  striptHide(){
    if (this.scriptStr !== undefined){
      return false
    } else {
      return true
    }
  }

}
