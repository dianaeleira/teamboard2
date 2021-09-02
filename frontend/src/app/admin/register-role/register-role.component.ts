import { ViewChild, NgZone } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';



@Component({
  selector: 'app-register-role',
  templateUrl: './register-role.component.html',
  styleUrls: ['./register-role.component.css']
})
export class RegisterRoleComponent implements OnInit {
  registerData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  disableSelect = new FormControl(false);
  listRole: any;


  constructor(
    private _roleService: RoleService,
    private _router: Router,
    private _snackBar: MatSnackBar    
  ) { 
    this.registerData = {};
  }

  ngOnInit(): void {
  }

  registerRole() {
    if (
      !this.registerData.name ||
      !this.registerData.description
    ) {
      this.message = 'Failed process: Incomplete data.';
      this.openSnackBarError();
      this.registerData = {};
    } else {
      this._roleService.registerRole(this.registerData).subscribe(
        (res) => {
          
          this._router.navigate(['/listRole']);
          this.message = 'Successfull role registration.';
          this.openSnackBarSuccesfull();
          this.registerData = {};
        },
        (err) => {
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    }
  }

  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue'],
    });
  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse'],
    });
  }

}
