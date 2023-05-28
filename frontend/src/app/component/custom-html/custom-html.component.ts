import { DataService } from 'src/app/services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import {
  Component,
  ViewChild,
  ElementRef,
  Input, OnInit,Output, EventEmitter, Renderer2, Inject
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ResponseData, ResponseReturn } from 'src/app/shared/application_data';
import { ApiCallService } from 'src/app/services/api-call.service';
@Component({
  selector: 'app-custom-html',
  templateUrl: './custom-html.component.html',
  styleUrls: ['./custom-html.component.scss'],
})
export class CustomHtmlComponent implements OnInit {
  @Input() url!: string;
  loading = true
  look_up!: string
  page!: string

  htmlStr: any
  cssStr: any
  scriptStr: any

  // cssHide: boolean = true
  // @ViewChild('css', { static: false }) cssSelect!: ElementRef;


  constructor(private ds: DataService, protected sanitizer: DomSanitizer,
              private api: ApiCallService, private renderer: Renderer2,
              @Inject(DOCUMENT) private document: HTMLDocument
) { }

  ngOnInit(): void {
    this.look_up = this.api.lookup(false, this.url)
    this.page = this.ds.get_page()
    this.ds.input_emitter.subscribe((rr:ResponseReturn) => {

      if (rr.lookup !== this.look_up){
        return
      }

      // console.log(1)
      // console.log(rr.lookup)
      // console.log(this.look_up)
      // console.log(2)
      if (rr.message !== undefined){
        // console.log("message is not undefined")
        this.loading = true;
      } else if (rr.calling){
        this.loading = true;
      } else {
        let t = rr.t as ResponseData
        this.loading = false

        this.htmlStr = this.sanitizer.bypassSecurityTrustHtml(t.custom_html_data?.html as string)
        if (t?.custom_html_data?.script !== undefined){
          const script = this.renderer.createElement("script");
          this.renderer.setProperty(
            script,
            "text",
            t?.custom_html_data?.script
          );
          this.renderer.appendChild(this.document.body, script);
        }
      }

    })

    let pull = this.api.needToPull(false, this.url, this.page);
    this.api.call_this.emit({"forced": pull, "url": this.url, "look_up": this.look_up, "page": this.page, "isSidebar": false})


  }

  striptHide(){
    if (this.scriptStr !== undefined){
      return false
    } else {
      return true
    }
  }

}
