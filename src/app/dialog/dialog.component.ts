import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  [x: string]: any;
  displayedColumns: string[] = ['name', 'email', 'contactNo', 'department', 'joiningDate', 'gender', 'action'];



  actButton: string = "Save";

  employeesForm !: FormGroup;
  constructor(private formbuilder: FormBuilder, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>) { }


  genderList = ["Male", "Female", "Other"]

  get name() { return this.employeesForm.get('name') }
  get email() { return this.employeesForm.get('email') }
  get contactno() { return this.employeesForm.get('contactno') }
  get department() { return this.employeesForm.get('department') }
  get joiningdate() { return this.employeesForm.get('joiningdate') }
  get gender() { return this.employeesForm.get('gender') }



  ngOnInit(): void {
    this.employeesForm = this.formbuilder.group({
      name: new FormControl('', [Validators.required,]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contactno: new FormControl('', [Validators.required,Validators.pattern('^[0-9]{0,10}$')]),
      department: new FormControl('', [Validators.required]),
      joiningdate: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
    })

    if (this.editData) {
      this.actButton = "Update";
      this.employeesForm.controls['name'].setValue(this.editData.name);
      this.employeesForm.controls['email'].setValue(this.editData.email);
      this.employeesForm.controls['contactno'].setValue(this.editData.contactno);
      this.employeesForm.controls['department'].setValue(this.editData.department);
      this.employeesForm.controls['joiningdate'].setValue(this.editData.joiningdate);
      this.employeesForm.controls['gender'].setValue(this.editData.gender);

    }
  }
  add() {
    // console.log(this.employeesForm.value)
    if (!this.editData) {
      if (this.employeesForm.valid) {
        this.api.postEmployees(this.employeesForm.value)
          .subscribe({
            next: (res) => {
              alert("Employee added Successfully");
              this.employeesForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("Error while adding Employee")
            }
          })
      }
    } else {
      // alert("update executed");
      this.updateEmployee()
    }
  }

  updateEmployee() {
    this.api.putEmployees(this.employeesForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Employee update successfully");
          this.employeesForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Error while updating employees");
        }
      })
  }
}


