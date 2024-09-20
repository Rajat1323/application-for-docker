import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../Component/header/header.component';
import { SidenavbarComponent } from '../../../Component/sidenavbar/sidenavbar.component';
import { FooterComponent } from '../../../Component/footer/footer.component';
import { DatatableComponent } from '../../../Component/datatable/datatable.component';
import { UserService } from '../../../Service/User/user.service';
import { AuthServiceService } from '../../../Service/Auth/auth-service.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [HeaderComponent,SidenavbarComponent,FooterComponent,DatatableComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{
  constructor(
    private userService:UserService,
    private authService:AuthServiceService,
    private toastr: ToastrService
  ){}
  totalUser:any;
  ngOnInit(): void {
    this.getTotalUser();
    this.userService.RequiredRefresh.subscribe(()=>this.getTotalUser());
  } 
  getTotalUser(){
    this.userService.allUser().subscribe({
      next: (data) => {
      this.totalUser = data.length;
      },
      error: (e) => {
        console.error(e);
        this.toastr.error(e.error.message, 'Error', {
          timeOut: 2000,
        });
        if(!e.error.token) this.authService.logout();
      }
    });
  }
}
