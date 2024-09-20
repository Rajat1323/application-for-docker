import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../Service/User/user.service';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import User from '../../../DTO/userDTO';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../../../Service/Auth/auth-service.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService,
    private authService: AuthServiceService,
    private dialogref: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}
  editdata!: User;
  ngOnInit(): void {
    if (this.data != null) {
      this.LoadEditData(this.data);
    }
  }

  LoadEditData(data: any) {
    this.editForm.setValue({
      id: data.id,
      fullName: data.fullName,
      userName: data.userName,
      mobile: data.mobile,
    });
  }
  editForm = this.fb.group({
    id: [''],
    fullName: ['', Validators.required],
    userName: ['',[Validators.required, Validators.email]],
    mobile: ['',[
      Validators.required,
      Validators.pattern(
        /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
      ),
    ]],
  });

  onEditSubmit(): void {
    if (this.editForm.valid) {
      const data: User = this.editForm.getRawValue() as User;
      console.log(data);
      this.userService.updateUser(data).subscribe({
        next: (result) => {
          this.dialogref.close();
          this.toastr.info(result.message, 'Success', {
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
