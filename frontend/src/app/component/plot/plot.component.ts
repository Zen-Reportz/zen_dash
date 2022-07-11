import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';


@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss']
})
export class PlotComponent implements OnInit {
  @Input() uuid!: string

  constructor(private dataService: DataService) {}

  ngOnInit(): void {


  }


  get_options(){
    return this.dataService.chart_data.get(this.uuid)?.data as any
  }

}
