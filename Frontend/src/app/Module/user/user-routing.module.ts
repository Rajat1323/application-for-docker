import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from '../../UserLayout/UserDashboard/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {'path':'dashboard', component:UserDashboardComponent},
    {'path':'',redirectTo:'dashboard',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
