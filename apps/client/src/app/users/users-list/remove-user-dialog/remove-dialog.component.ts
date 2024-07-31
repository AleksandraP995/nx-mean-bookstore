import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-dialog',
  templateUrl: './remove-dialog.component.html',
  styleUrls: ['./remove-dialog.component.scss']
})
export class RemoveDialogComponent implements OnInit {
  userEmail: string = '';

  constructor(
  public dialogRef: MatDialogRef<RemoveDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
) { }

  ngOnInit(): void {
    this.userEmail = this.data.email; 

  }

  onNoClick() {
    this.dialogRef.close();
  }

}
