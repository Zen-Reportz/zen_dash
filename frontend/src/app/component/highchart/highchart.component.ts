import { Chart, StockChart, MapChart } from 'angular-highcharts';
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

    this.checkFunction(this.dataService.all_input.get(this.url)?.highchart_data?.config)

    if (this.dataService.all_input.get(this.url)?.highchart_data?.type == "chart"){
      this.data = new Chart(
        this.dataService.all_input.get(this.url)?.highchart_data?.config
      );
    }

    if (this.dataService.all_input.get(this.url)?.highchart_data?.type == "stock"){
      this.data = new StockChart(
        this.dataService.all_input.get(this.url)?.highchart_data?.config
      );
    }

    if (this.dataService.all_input.get(this.url)?.highchart_data?.type == "map"){
      this.data = new MapChart(
        this.dataService.all_input.get(this.url)?.highchart_data?.config
      );
    }


    setTimeout(this.resize_it, 1000);
  }

  resize_it(){
    window.dispatchEvent(new Event('resize'));
  }
}
