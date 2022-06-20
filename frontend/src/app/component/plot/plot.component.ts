import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';


@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss']
})
export class PlotComponent implements OnInit {
  @Input() url!: string
  options: any;
  constructor(private http: HttpClient, private dataService: DataService) {}

  ngOnInit(): void {
   this.getData()


  }

  getData() {
    this.http
      .post<any>(location.origin + this.url, this.dataService.data)
      .subscribe((t) => {
        this.options = t
      });
  }


}
