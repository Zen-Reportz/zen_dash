import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { TableColumn } from '../../shared/application_data';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() url!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatPaginator, { static: false }) set matPaginator(paginator: MatPaginator) {
  //   this.dataSource.paginator = paginator;
  //  }
  // @ViewChild(MatSort, { static: false }) set matSortorer(sort: MatSort) {
  //   this.dataSource.sort = sort;
  // }
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = [];
  value!: string;
  columns!: Array<TableColumn>;
  items_per_page!: number
  items_per_page_options!: number[]
  show_download_button!: boolean
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.columns = this.dataService.all_input.get(this.url)?.table_data
      ?.columns as TableColumn[];

    this.dataSource = new MatTableDataSource<any>(
      this.dataService.all_input.get(this.url)?.table_data?.data as any
    );

    this.show_download_button = this.dataService.all_input.get(this.url)?.table_data?.show_download_button as boolean

    this.items_per_page = this.dataService.all_input.get(this.url)?.table_data?.items_per_page as number
    this.items_per_page_options = this.dataService.all_input.get(this.url)?.table_data?.items_per_page_options as number[]

    this.displayedColumns = this.displayedColumns.concat(
      this.columns.map((x) => x.columnDef)
    ); // pre-fix static
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
  // ngAfterViewInit() {
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  download(){
    let csv = '';

    let csv_columns = []
    for (let column = 0; column < this.columns.length; column++) {

      csv += this.columns[column]["header"] + ',';
      csv_columns.push(this.columns[column]["columnDef"])
      csv = csv.replace(/\n/g, '');
    }

    csv = csv.substring(0, csv.length - 1) + '\n';
    const rows = this.dataService.all_input.get(this.url)?.table_data?.data as any;
    for (let row = 0; row < rows.length; row++) {
     for (let colindex = 0; colindex < csv_columns.length; colindex++) {
        csv += rows[row][csv_columns[colindex]] + ',';
     }
      csv = csv.substring(0, csv.length - 1) + '\n';
    }
    csv = csv.substring(0, csv.length - 1) + '\n';
    const docElement = document.createElement('a');
    const universalBOM = '\uFEFF';

    //You can edit the code for the file name according to your requirements
    let filename = "download_file"
    const fileNameWithType = filename.concat('.csv');
    docElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(universalBOM + csv);
    docElement.target = '_blank';
    docElement.download = fileNameWithType;
    docElement.click();
  }
}
