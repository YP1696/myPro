import { AfterViewChecked, Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  @Output() addEmployeeEvent = new EventEmitter<any>();

  addedEmployee: string;

  // [x: string]: any;

  dataSource: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  genderList = ["Male", "Female", "Other"]


  actButton: string = "Save";


  name: string;
  contactNo: number;
  email: string;
  department: string;
  joiningDate: string;
  gender: string;

  submitted = false;


  employeesForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    contactno: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    department: new FormControl('', [Validators.required]),
    joiningdate: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
  })


  constructor(private api: ApiService) {

  }
  // public WhitespacesInvalid(control: FormControl) {
  //   const isWhitespace = (control.value || '').trim().length === 0;
  //   const isValid = !isWhitespace;
  //   return isValid ? null : { 'whitespaceInvalid': true };
  // }

  // get f(): { [key: string]: AbstractControl } {
  //   return this.form.controls;
  // }
  // get f() { return this.employeesForm.controls; }


  // onSubmit(): void {
  //   this.submitted = true;

  //   if (this.form.invalid) {
  //     return;
  //   }

  //   console.log(JSON.stringify(this.form.value, null, 2));
  // }
  onSubmit() {
    //console.log(this.employeesForm);

    this.submitted = true;

    // stop here if form is invalid
    if (this.employeesForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.employeesForm.value, null, 4));
            this.employeesForm.reset();
            this.addEmployeeEvent.emit(this.employeesForm.value);
  }


  ngOnInit(): void {

  }


  add() {
    this.submitted=true;
    if (this.employeesForm.valid) {
      // console.log(this.employeesForm.value);
      // return

      this.api.postEmployees(this.employeesForm.value)
        .subscribe({
          next: (res) => {
            alert("Employee added Successfully");
            this.employeesForm.reset();
            this.addEmployeeEvent.emit(this.employeesForm.value);
            // this.getAllEmp();
          },
          error: () => {
            alert("Error while adding Employee")
          }
        })
    }

  }


  // onKeyPress(params: any) {
  //   if (params.key === 'Backspace' || params.key === '.') {
  //     return true;
  //   } else if (!this.isKeyPressedNumeric(params)) {
  //     return false;
  //   }
  // }

  // private isKeyPressedNumeric(event: any): boolean {
  //   var inputVal = <HTMLInputElement>document.getElementById('Input');
  //   var input = inputVal.value;
  //   input = input + event.key;
  //   if (input.length >= 2) {
  //     var txtVal = input;
  //     return /^((\d{1,10}))$/.test(txtVal);
  //   }

  //   const charCode = this.getCharCode(event);
  //   const charStr = event.key ? event.key : String.fromCharCode(charCode);
  //   return this.isCharNumeric(charStr);
  // }

  // private getCharCode(event: any): any {
  //   event = event || window.event;
  //   return typeof event.which == 'undefined' ? event.keyCode : event.which;
  // }

  // private isCharNumeric(charStr: any): boolean {
  //   var validation = false;

  //   if (charStr == '.') {
  //     validation = !!/\./.test(charStr);
  //   } else {
  //     validation = !!/\d/.test(charStr);
  //   }
  //   return validation;
  // }

}


