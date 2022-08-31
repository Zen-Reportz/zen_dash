import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarData } from 'src/app/shared/application_data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  side_data: SidebarData | undefined;
  page: string | null | undefined = null;

  constructor(private http: HttpClient, private aRoute: ActivatedRoute) {
    this.aRoute.fragment.subscribe((fragment) => {
      this.page = fragment;
    });
  }

  ngOnInit(): void {
    this.http.get<SidebarData>('/backend/sidebar').subscribe((data) => {
      this.side_data = data;
    });
  }
}
