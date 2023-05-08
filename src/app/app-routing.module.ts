import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetsComponent } from './assets/assets.component';
import { DepartmentComponent } from './department/department.component';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { OrganizationComponent } from './organization/organization.component';
import { SignupComponent } from './signup/signup.component';
import { DialogComponent } from './dialog/dialog.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'assets', component: AssetsComponent},
  { path: 'department', component: DepartmentComponent},
  { path: 'employees', component: EmployeesComponent},
  { path: 'organization', component: OrganizationComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'dialog', component:DialogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
