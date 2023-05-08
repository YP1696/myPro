import { AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild ,AfterViewInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';



export interface PeriodicElement {
  name: string;
  contactNo: number;
  email: string;
  department: string;
  joiningDate: string;
  gender: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    name: 'yogesh', email: 'yp1696@gmail.com', contactNo: 1264845498,
    department: 'FE', joiningDate: '1-08-2022', gender: 'Male',
  },
];


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'contactNo', 'department', 'joiningDate', 'gender', 'action'];
  dataSource: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  employeesForm: any;
  dialogRef: any;

  // addData() {
  //   const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
  //   this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
  //   this.paginator.renderRows();
  // }

  // removeData() {
  //   this.dataSource.pop();
  //   this.table.renderRows();
  // }
  constructor(private dialog: MatDialog, private api: ApiService,private change:ChangeDetectorRef) {

  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllEmp();
      }
    })
  }

  addEmp(empData){
   this.getAllEmp();
  }


  ngOnInit(): void {
    this.getAllEmp();
  }
  editEmployee(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllEmp();
      }
    })
  }

  getAllEmp() {
    this.api.getEmployees()
      .subscribe((res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      })
  }
  
  deleteEmp(id: number,data: any) { 
    console.log(data);
    // return

    this.api.delEmployees(id)
      .subscribe({
        next: (res) => {
          alert("Employee deleted Successfully");
          this.postDeletedEmployees(data)
          this.getAllEmp();
        },
        error: () => {
          alert("Error while deleting employees");
        }
      })
  }

  private postDeletedEmployees(data){
    this.api.postDeletedEmployees(data)
    .subscribe({
      next: (res) => {
        // console.log(id)
        alert("deleted employees Added Successfully")
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource?.paginator) {
      this.dataSource?.paginator.firstPage();
    }
  }

}