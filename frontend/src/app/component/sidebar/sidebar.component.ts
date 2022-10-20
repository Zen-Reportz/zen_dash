import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallServiceService } from 'src/app/services/call-service.service';
import { SidebarData } from 'src/app/shared/application_data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() size = new EventEmitter<string>();
  side_data: SidebarData | undefined;
  page: string | null | undefined = null;


  constructor(private http: HttpClient, private aRoute: ActivatedRoute, private call: CallServiceService) {
    this.aRoute.fragment.subscribe((fragment) => {
      this.page = fragment;
    });
  }

  ngOnInit(): void {
    this.http.get<SidebarData>(this.call.my_url()  + 'backend/sidebar').subscribe((data) => {
      this.side_data = data;
      this.size.emit(this.side_data.size)
    });
  }
}
