import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { UUID } from 'angular2-uuid';
import { BoxData, ButtonToggleData, ChartData, CheckboxData, DateData, GroupFilterData, MultiURLInfo, RadioData, ResponseData, SimpleFilterData, SliderData, TableData, ToggleData } from '../../shared/application_data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-entery-point',
  templateUrl: './entery-point.component.html',
  styleUrls: ['./entery-point.component.scss']
})
export class EnteryPointComponent implements OnInit {
  @Input() url!: string
  pulled = false
  uuid = UUID.UUID()
  title: string | undefined
  type: string | undefined
  footer: string | undefined
  name: string | undefined
  reactive: boolean | undefined  = false
  d: Subscription | undefined
  urls!: MultiURLInfo[]

  data_type = ["box", "table", 'chart']
  no_supported = ["multi_list"]


  constructor(private http: HttpClient, private dataService: DataService) {


  }

  ngOnInit(): void {
    this.getData()

  }

  subscribe(){
    if (this.name !== undefined){
      if (this.no_supported.indexOf(this.type as string) >= 0){
        return
      }

      if (this.data_type.indexOf(this.type as string) >= 0 ){
        this.d = this.dataService.refresh.subscribe(t => {
            this.getData()
        })
      } else {
        if (this.reactive){
          this.d = this.dataService.refresh.subscribe(t => {
            if (t !== this.name){
              this.getData()
            }
        })
        }
      }
    }
  }

  deleteData(){
    if (this.d !== undefined){
      this.d.unsubscribe()
    }

    this.reactive = undefined
    switch(this.type){
      case "box":
        this.dataService.box_data.delete(this.uuid)
        break
      case "date":
        this.dataService.date_data.delete(this.uuid)
        break
      case "table":
        this.dataService.table_data.delete(this.uuid)
        break
      case "chart":
        this.dataService.chart_data.delete(this.uuid)
        break
      case "radio":
        this.dataService.radio_data.delete(this.uuid)
        break
      case "checkbox":
        this.dataService.checkbox_data.delete(this.uuid)
        break
      case "slider":
          this.dataService.slider_data.delete(this.uuid)
          break
      case "button_toggle":
          this.dataService.button_toggle_data.delete(this.uuid)
          break
      case "toggle":
        this.dataService.toggle_data.delete(this.uuid)
        break
      case "filter":
        this.dataService.simple_filter_data.delete(this.uuid)
        break
      case 'filter_group':
        this.dataService.group_filter_data.delete(this.uuid)
        break

    }
    this.pulled=false
    this.title = "Loading"
    this.type = undefined
    this.footer = undefined


  }

  getData(){
    if (this.type !== undefined){
      this.deleteData()
    }
    this.urls = []

    this.http.post<ResponseData>(location.origin + this.url, this.dataService.data).subscribe((t) => {
      this.reactive = t.reactive
      switch(t.type){
        case "box":
          this.dataService.box_data.set(this.uuid, t.box_data as BoxData)
          this.name = t.box_data?.name as string
          break
        case "date":
          this.dataService.date_data.set(this.uuid, t.date_data as DateData)
          this.name = t.date_data?.name as string
          break
        case "table":
          this.dataService.table_data.set(this.uuid, t.table_data as TableData)
          this.name = t.table_data?.name as string
          break
        case "chart":
          this.dataService.chart_data.set(this.uuid , t.chart_data as ChartData)
          this.name = t.chart_data?.name as string
          break
        case "radio":
          this.dataService.radio_data.set(this.uuid, t.radio_data as RadioData)
          this.name = t.radio_data?.name as string
          break
        case "checkbox":
          this.dataService.checkbox_data.set(this.uuid, t.checkbox_data as CheckboxData)
          this.name = t.checkbox_data?.name as string
          break
        case "slider":
            this.dataService.slider_data.set(this.uuid, t.slider_data as SliderData)
            this.name = t.slider_data?.name as string
            break
        case "button_toggle":
            this.dataService.button_toggle_data.set(this.uuid, t.button_toggle_data as ButtonToggleData)
            this.name = t.button_toggle_data?.name as string
            break
        case "toggle":
          this.dataService.toggle_data.set(this.uuid, t.toggle_data as ToggleData)
          this.name = t.button_toggle_data?.name as string
          break
        case "multi_list":
          this.urls = t.multi_data?.urls as MultiURLInfo[]
          break
        case "multi_tabs":
            this.urls = t.multi_data?.urls as MultiURLInfo[]
            break
        case "multi_expand":
          this.urls = t.multi_data?.urls as MultiURLInfo[]
          break
        case "simple_filter":
          this.dataService.simple_filter_data.set(this.uuid, t.simple_filter_data as SimpleFilterData)
          break
        case 'group_filter':
          this.dataService.group_filter_data.set(this.uuid, t.group_filter_data as GroupFilterData)
          break
        default:
          console.log(t.type)
      }

      this.pulled=true
      this.title = t.title
      this.type = t.type
      this.footer = t.footer

      this.subscribe()
    })
  }

  getTitle(){
    return (this.title) ? this.title : undefined

  }

  getFooter(){
    return (this.footer) ? this.footer : undefined

  }

  getURLs(){
    return this.urls
  }

  getName(name: string |undefined){
    if (! name){
      return 'Loading'
    }else {
      return name
    }
  }

}
