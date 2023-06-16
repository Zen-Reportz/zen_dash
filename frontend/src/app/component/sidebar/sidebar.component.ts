import { SidebarTab, SidebarGroup, ReactiveData, FlexData } from './../../shared/application_data';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallServiceService } from 'src/app/services/call-service.service';
import { SidebarData } from 'src/app/shared/application_data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() url!: string
  @Output() size = new EventEmitter<string>();
  side_data!: SidebarData ;
  reactivityData = new Map<string, ReactiveData>();
  flexData = new Map<string, FlexData>();

  page: string | null | undefined = null;


  constructor(private http: HttpClient,
    private aRoute: ActivatedRoute,
    private call: CallServiceService,
    private ds: DataService) {
    this.aRoute.queryParamMap.subscribe((fragment) => {
      this.page = fragment.get('page');
    });
  }

  ngOnInit(): void {
    this.http.get<SidebarData>(this.call.my_url()  + this.url).subscribe((data) => {
      this.side_data = data;
      console.log(`Python library version is ${this.side_data.library_version}`)
      try {
        this.side_data.tabs.forEach((name:any)=> {
          if (name.label !== undefined){
            this.page = 'page_0'
            this.ds.defaul_page = 'page_0'
          } else if (name.name !== undefined){
            this.page = 'page_0_0'
            this.ds.defaul_page = 'page_0_0'
          }
          throw "break";
        })
      } catch {

      }

      this.size.emit(this.side_data.size)
    });
  }

  getSideData(){
    return this.side_data?.tabs as any
  }

  isSideData(){
    return this.side_data?.tabs.length > 0
  }

  setFlex(url: string, flexData: FlexData){
    this.flexData.set(url, flexData)
  }

  setReactivity(url: string, reactiveData: ReactiveData){
    this.reactivityData.set(url, reactiveData)
  }
}
