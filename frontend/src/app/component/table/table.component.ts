import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/shared/data.service';
import {  TableColumn, TableData } from '../application_data';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() url!: string
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = [];
  value!: string;
  columns!: Array<TableColumn>;
  dataset: Array<any> = [];
  pulled = false
  constructor(private http: HttpClient, private dataService: DataService) { }


  ngOnInit() {
    this.http.post<TableData>(location.origin + this.url, this.dataService.data ).subscribe((t) => {
      console.log(t)
      this.columns = t.columns
      this.dataset = t.data
        // set checkbox column
      // this.displayedColumns.push("select");

      // set table columns
      this.displayedColumns = this.displayedColumns.concat(this.columns.map(x => x.columnDef));    // pre-fix static


      this.dataSource = new MatTableDataSource<any>(this.dataset);

      // set pagination
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.pulled =true
    })

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  // ngAfterViewInit() {
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


