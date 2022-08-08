import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlexData } from 'src/app/shared/application_data';


@Component({
  selector: 'app-entry-point',
  templateUrl: './entry-point.component.html',
  styleUrls: ['./entry-point.component.scss']
})
export class EntryPointComponent implements OnInit {
  @Input() url!: string
  @Output() fxFlex = new EventEmitter<FlexData>();

  pulled: boolean = false
  footer!: string
  title!: string

  constructor(){

  }

  ngOnInit(): void {
  }

  setPulled(result:boolean){
    this.pulled = result
  }

  setFooter(result:string){
    this.footer = result
  }

  getFooter(){
    return this.footer
  }

  setTitle(result:string){
    this.title = result
  }

  getTitle(){
    return this.title
  }

  setFlex(event: FlexData){
    this.fxFlex.emit(event)
  }

}
