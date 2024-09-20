import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { UserService } from '../../../Service/User/user.service';
import User from '../../../DTO/userDTO';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../../../Service/Auth/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  addForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private user: UserService,
    private authService: AuthServiceService,
    private dialogref: MatDialogRef<AddComponent>,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      fullName: ['', [Validators.required]],
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['',  [
        Validators.required,
        Validators.pattern(
          /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
        ),
      ]],
      role:['User'],
    });
  }

  onAddSubmit(): void {
    if (this.addForm.valid) {
      const data: User = this.addForm.getRawValue() as User;
      this.user.addUser(data).subscribe({
        next: (result) => {
          this.dialogref.close();
          this.toastr.success(result.message, 'Success', {
            timeOut: 2000,
          });
        },
        error: (e) => {
          this.dialogref.close();
          if (!e.error.token) this.authService.logout();
          this.toastr.error(e.error.message, 'Error', {
            timeOut: 2000,
          });
        },
      });
    }
  }
}
