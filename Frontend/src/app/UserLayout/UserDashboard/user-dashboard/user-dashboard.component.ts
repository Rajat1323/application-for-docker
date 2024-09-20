import { Component } from '@angular/core';
import { FooterComponent } from '../../../Component/footer/footer.component';
import { SidenavbarComponent } from '../../../Component/sidenavbar/sidenavbar.component';
import { HeaderComponent } from '../../../Component/header/header.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [HeaderComponent,SidenavbarComponent,FooterComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  fullName:any;
  ngOnInit():void{
    this.fullName=localStorage.getItem('name');
  }
}
