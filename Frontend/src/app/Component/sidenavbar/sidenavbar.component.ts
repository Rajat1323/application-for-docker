import { Component } from '@angular/core';
import { AuthServiceService } from '../../Service/Auth/auth-service.service';

@Component({
  selector: 'app-sidenavbar',
  standalone: true,
  imports: [],
  templateUrl: './sidenavbar.component.html',
  styleUrl: './sidenavbar.component.css'
})
export class SidenavbarComponent {
  constructor(private auth:AuthServiceService){};
logout():void{
  this.auth.logout();
}
}
