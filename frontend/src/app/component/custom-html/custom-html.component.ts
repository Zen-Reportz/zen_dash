import { DataService } from 'src/app/services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import {ComponentPortal, DomPortal, Portal, TemplatePortal} from '@angular/cdk/portal';
import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ElementRef,
  Input, OnInit, Renderer2, ViewEncapsulation
} from '@angular/core';
import { ConnectableObservable } from 'rxjs';
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


  constructor(private ds: DataService, private renderer: Renderer2, protected sanitizer: DomSanitizer, private _viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {

    this.htmlStr = this.sanitizer.bypassSecurityTrustHtml(this.ds.all_input.get(this.url)?.custom_html_data?.html as string)

  }

}
