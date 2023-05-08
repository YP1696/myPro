import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { MatTable,MatTableDataSource } from '@angular/material/table'; 
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'contactNo', 'department', 'joiningDate', 'gender'];

  dataSource: MatTableDataSource<any>;
  paginator: MatPaginator;
  sort: MatSort;
   

  constructor(
    private api: ApiService,
  ) { 

  }
  ngOnInit(): void {
    this.getDeletedEmployees()
  }
  

  // deleteEmp(id:number){
  //   this.api.delEmployees(id)
  //   .subscribe({
  //     next:(res)=>{
  //       alert("Employee deleted Successfully");
  //     },
  //     error:()=>{
  //       alert("Error while deleting employees");
  //     }
  //   })  
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource?.paginator) {
      this.dataSource?.paginator.firstPage();
    }
  }
  getDeletedEmployees(){
    this.api.getDeletedEmployees()
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      })
  }
  }




