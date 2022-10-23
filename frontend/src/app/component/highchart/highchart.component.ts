import { Chart } from 'angular-highcharts';
import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-highchart',
  templateUrl: './highchart.component.html',
  styleUrls: ['./highchart.component.scss'],
})
export class HighchartComponent implements OnInit {
  @Input() url!: string;
  data: any;
  constructor(private dataService: DataService) {}

  checkFunction(object:any) {
    Object.keys(object).forEach(k => {
        if (object[k] && typeof object[k] === 'object') {
            this.checkFunction(object[k]);
        }
        if (typeof object[k] === 'string' || object[k] instanceof String) {
          if (object[k].includes("new Date")) {
            object[k] = eval(object[k])
          }

          else if (object[k].includes("function")) {
            object[k] = eval(object[k])
          }

        }

    });
}



  ngOnInit(): void {

    this.checkFunction(this.dataService.all_input.get(this.url).highchart_data.config)


    this.data = new Chart(
      this.dataService.all_input.get(this.url).highchart_data.config
    );
  }
}
