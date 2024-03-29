import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

interface Loading {
  status: string
  message: string
}

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Loading) {
  }

  ngOnInit(): void {}
}
