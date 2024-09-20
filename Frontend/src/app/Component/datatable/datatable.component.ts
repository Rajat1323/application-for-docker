import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../Module/material-module';
import { UserService } from '../../Service/User/user.service';
import User from '../../DTO/userDTO';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../Modal/add/add.component';
import { EditComponent } from '../Modal/edit/edit.component';
import { DeleteComponent } from '../Modal/delete/delete.component';
import { AuthServiceService } from '../../Service/Auth/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [MaterialModule,MatIconModule,CommonModule],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.css'
})
export class DatatableComponent {
  constructor(
    private userService:UserService,
    private authService:AuthServiceService, 
    private dialog:MatDialog,
    private toastr: ToastrService
  ){}
  displayedColumns: string[] = ['status','fullName', 'mobile', 'userName', 'password','role','action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userDataSource :any;

  
  ngOnInit(): void {
    this.getAllUser();
    this.userService.RequiredRefresh.subscribe(()=>this.getAllUser());
  }
  getAllUser(){
    //fetch user for datatable
    this.userService.allUser().subscribe({
      next: (data) => {
      this.userService.SetTotalUser = data.length;
       this.userDataSource =new MatTableDataSource<User>(data);
       this.userDataSource.paginator =this.paginator;
       this.userDataSource.sort =this.sort;
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
  filterChange(event:Event){
    const value =(event.target as HTMLInputElement).value;
    this.userDataSource.filter =value;
  }

  openAddDialog(enterAnimationDuration:any,exitAnimationDuration:any){
    let width = '50%';// desktop device

    if (window.innerWidth < 768) { // tablet or mobile device
      width = '90%';
    } 
    this.dialog.open(AddComponent,{width: width,
      enterAnimationDuration,
      exitAnimationDuration,})
  }

  openEditDialog(enterAnimationDuration:any,exitAnimationDuration:any,user:any){
    let width = '50%';// desktop device

    if (window.innerWidth < 768) { // tablet or mobile device
      width = '90%';
    }
    this.dialog.open(EditComponent,{width: width,
      enterAnimationDuration,
      exitAnimationDuration,
      data:user
    })
  }

  openDeleteDialog(enterAnimationDuration:any,exitAnimationDuration:any,id:any){
    let width = '40%';// desktop device

    if (window.innerWidth < 768) { // tablet or mobile device
      width = '90%';
    }
    this.dialog.open(DeleteComponent,{width: width,
      enterAnimationDuration,
      exitAnimationDuration,
      data:id
    })

  }
}
