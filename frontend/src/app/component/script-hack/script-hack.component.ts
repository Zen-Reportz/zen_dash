import { Component, ElementRef, ViewChild, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-script-hack',
  templateUrl: './script-hack.component.html',
  styleUrls: ['./script-hack.component.scss']
})
export class ScriptHackComponent {

  @Input()
  src!: string;

  @Input()
  type!: string;

  @ViewChild('script') script!: ElementRef;

  convertToScript() {
      var element = this.script.nativeElement;
      var script = document.createElement("script");
      script.type = this.type ? this.type : "text/javascript";
      if (this.src) {
          script.src = this.src;
      }
      if (element.innerHTML) {
          script.innerHTML = element.innerHTML;
      }
      var parent = element.parentElement;
      parent.parentElement.replaceChild(script, parent);
  }

  ngAfterViewInit() {
      this.convertToScript();
  }

}
