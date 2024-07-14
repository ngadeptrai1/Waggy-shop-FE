import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { ModalComponent } from '../../../modal/modal.component';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { LoginPayload } from '../../../../../type';
import { Router } from '@angular/router';
import { LocalStorage } from '../../../../constans/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,ModalComponent
    ,CommonModule
    ,MatSnackBarModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponent {
  si_form = inject(NonNullableFormBuilder);
  modalVisible: boolean = false;
  modalMessage: string = '';
  authService = inject(AuthService);
  router = inject(Router)
  matSnackBar = inject(MatSnackBar);

  form_si = this.si_form.group({
    account_name: ['',[Validators.required,Validators.maxLength(12),Validators.minLength(6)]],
    password: ['', [Validators.required,Validators.maxLength(12),Validators.minLength(6)]]
  })

  onModalClose(): void {
    this.modalVisible = false;
    this.modalMessage = "";
  }
  onSubmitLogin(){
    if(this.form_si.invalid){
      this.form_si.markAllAsTouched();
      return
   }
   localStorage.removeItem(LocalStorage.token);
     this.authService.login( this.form_si.value as LoginPayload).subscribe({
         next:(res)=>{
           this.matSnackBar.open("Loggin Successfuly","",{duration:3000});
                  this.router.navigate(['']);
         },
         error:(err)=>{     
          this.matSnackBar.open(err.error.message)
         },
         complete:()=>{
         
             console.log("ok");
             
         }
       }
     );
  }
  
}
