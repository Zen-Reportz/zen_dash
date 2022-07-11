import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {
  @Input() uuid!: string;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

  }


  getIcon(){
    return this.dataService.box_data.get(this.uuid)?.icon
  }

  getValue(){
    return this.dataService.box_data.get(this.uuid)?.value

  }

  getName(){
    return this.dataService.box_data.get(this.uuid)?.name

  }

}


