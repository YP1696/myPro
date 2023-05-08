import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  postEmployees(data : any ){
    return this.http.post<any>("http://localhost:3000/employeeList/",data);
  }
  getEmployees(){
    return this.http.get<any>("http://localhost:3000/employeeList/",);
  }
  putEmployees(data : any,id : number){
    return this.http.put<any>("http://localhost:3000/employeeList/"+id,data);

  }
  delEmployees(id:number){
    return this.http.delete<any>("http://localhost:3000/employeeList/"+id);
  }
  postDeletedEmployees(data : any){
    return this.http.post<any>("http://localhost:3000/deletedEmployees/",data);
  }
  getDeletedEmployees(){
    return this.http.get<any>("http://localhost:3000/deletedEmployees/",);

  }
}
