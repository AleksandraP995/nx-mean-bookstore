import { Component, Inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SetAdminClaimsData } from '../../../models/setAdminClaimsData';

@Component({
  selector: 'app-admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls: ['./admin-role.component.scss'],
})
export class AdminRoleComponent implements OnInit {
  @Input() userEmail: string = '';
  @Input() isAdmin: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AdminRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public dataToPass: SetAdminClaimsData
  ) {
    this.userEmail = dataToPass.email;
    this.isAdmin = dataToPass.isAdmin;
  }

  ngOnInit(): void {
    this.updateData(this.dataToPass);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataToPass']) {
      this.updateData(this.dataToPass);
    }
  }

  updateData(data: SetAdminClaimsData): void {
    this.userEmail = data.email;
    this.isAdmin = data.isAdmin;
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
