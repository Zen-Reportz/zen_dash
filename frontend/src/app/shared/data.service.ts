import { Injectable, EventEmitter } from '@angular/core';
import { MEData, SidebarData } from './data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  side_data!: SidebarData

  data = new Map<string, any >();
  data_setter = new EventEmitter< MEData >();
  refresh = new EventEmitter< undefined >();


  constructor() {
    this.data_setter.subscribe( (t) => {
      this.data.set(t.key, t.value)
    })


   }


}
