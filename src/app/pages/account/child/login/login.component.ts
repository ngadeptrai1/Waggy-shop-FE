import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { ModalComponent } from '../../../modal/modal.component';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { LoginPayload } from '../../../../../type';
import { Router, RouterLink } from '@angular/router';
import { LocalStorage } from '../../../../constans/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
 @Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,ModalComponent
    ,CommonModule
    ,MatSnackBarModule,
    MatFormFieldModule, MatInputModule, MatButtonModule,
     MatIconModule,RouterLink,NgxSpinnerModule],
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
  isLoading :boolean = false;
  spinner = inject(NgxSpinnerService );

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
      return;
   }
   this.isLoading = true;
    this.showSpin();
   localStorage.removeItem(LocalStorage.token);
     this.authService.login( this.form_si.value as LoginPayload).subscribe({
         next:(res)=>{
          setTimeout(()=>{
           this.isLoading = false;
          },5000)

           this.matSnackBar.open("Loggin Successfuly","",{duration:3000});
           location.replace("/")
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
  private showSpin():void{
    if(this.isLoading){
      this.spinner.show();
    }
    else{
      this.spinner.hide()
    }
  }
}
