import { Component, OnInit, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';


interface DialogData {
  custom_html: string
}

@Component({
  selector: 'app-support-dialog',
  templateUrl: './support-dialog.component.html',
  styleUrls: ['./support-dialog.component.scss'],
})
export class SupportDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SupportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}
  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
