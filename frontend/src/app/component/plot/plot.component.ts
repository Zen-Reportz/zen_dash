import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss'],
})
export class PlotComponent implements OnInit {
  @Input() url!: string;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  get_options() {
    return this.dataService.all_input.get(this.url)?.chart_data?.data as any;
  }
}
