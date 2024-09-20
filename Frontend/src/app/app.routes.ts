import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './UserLayout/AdminDashboard/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './UserLayout/UserDashboard/user-dashboard/user-dashboard.component';
import { LoginComponent } from './Auth/login/login.component';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { authGuard } from './Gurds/auth.guard';

export const routes: Routes = [
    {'path':'admin',canActivate:[authGuard], loadChildren:()=>import('./Module/admin/admin.module').then(m=>m.AdminModule)},
    {'path':'user',loadChildren:()=>import('./Module/user/user.module').then(m=>m.UserModule)},
    {'path':'auth/login',component: LoginComponent},
    {'path':'',redirectTo:'auth/login',pathMatch:'full'},
    {'path':'auth',redirectTo:'auth/login',pathMatch:'full'},
    {'path':'login',redirectTo:'auth/login',pathMatch:'full'},
    {'path':'**',component:PageNotFoundComponent},
];
