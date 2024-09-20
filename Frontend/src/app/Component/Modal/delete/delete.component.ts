import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MaterialModule } from '../../../Module/material-module';
import { UserService } from '../../../Service/User/user.service';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../../../Service/Auth/auth-service.service';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [
    MaterialModule,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions
  ],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
  constructor(
    private userService:UserService,
    private authService:AuthServiceService,
    private toastr: ToastrService, 
    private dialogref:MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public id:any
  ){}
  onDeleteSubmit(){
    this.userService.deleteUser(this.id).subscribe({
      next: (result) => {
        this.dialogref.close();
        this.toastr.warning(result.message, 'Information', {
          timeOut: 2000,
        });},
       error: (e) => {
        this.dialogref.close();
        if(!e.error.token) this.authService.logout();
        this.toastr.error(e.error.message, 'Error', {
          timeOut: 2000,
        });
       }
    });
  }
}
