import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SubmitType } from '../../../formValidations/enums';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.scss'],
})
export class NewUserDialogComponent implements OnInit {
  submitType = SubmitType.Login;

  constructor(dialogRef: MatDialogRef<NewUserDialogComponent>) {}

  ngOnInit(): void {}
}
