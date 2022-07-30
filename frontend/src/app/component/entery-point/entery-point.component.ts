import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-entery-point',
  templateUrl: './entery-point.component.html',
  styleUrls: ['./entery-point.component.scss']
})
export class EnteryPointComponent implements OnInit {
  @Input() url!: string

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


}
