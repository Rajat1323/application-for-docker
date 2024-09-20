import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthServiceService } from '../../Service/Auth/auth-service.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  fullName:any;
  userName:any;
  role:any;
  constructor(private auth:AuthServiceService){};
  ngOnInit(): void {
    initFlowbite();
    this.fullName=localStorage.getItem('name');
    this.userName=localStorage.getItem('userName');
    this.role=localStorage.getItem('role');
  }
  logout():void{
    this.auth.logout();
  }
}
