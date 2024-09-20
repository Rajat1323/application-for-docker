import { Component, Inject } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../Service/Auth/auth-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!:FormGroup;
  constructor(private auth:AuthServiceService, private router:Router, private fb:FormBuilder, private toastr: ToastrService){}

  ngOnInit():void{
    this.loginForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
    if(this.auth.isLoggedIn()){
      if(this.auth.isAdmin()) this.router.navigate(['/admin']);
        
      this.router.navigate(['/user']);
    }
  };
  
  

  onSubmit():void {
    if(this.loginForm.valid){
      
      this.auth.login(this.loginForm.value).subscribe({
        next: (result) => {
          if(result.role === 'Admin') this.router.navigate(['admin']);
          else this.router.navigate(['user']);
        },
         error: (e) => {
          this.toastr.error(e.error.message, 'Error', {
            timeOut: 2000,
          });
         }
      });
    }
  }
}
