import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MEData } from 'src/app/shared/data';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() label!: string;
  @Input() url!: string;
  @Input() single!: boolean;
  @Input() grouped!: boolean;
  @Input() name!: string;

  data: any
  dataForm = new FormControl();
  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit(): void {
    this.http.get(this.url).subscribe((data) => {
        let t:any = data
        this.data = t.data

    })

  }

  detectChange(value:any){
    let m = new MEData();
    m.key = this.name

    if (this.single) {
      m.value = [value.value]
    } else {
      m.value = value.value
    }


    this.dataService.data_setter.emit(m)
  }

}
