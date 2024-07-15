
import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../modal/modal.component';
import { AuthService } from '../../../../services/auth.service';
import { RegisterPayload } from '../../../../../type';
import { LocalStorage } from '../../../../constans/constants';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,ModalComponent,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterComponent {
  re_fb = inject(NonNullableFormBuilder);
  modalVisible: boolean = false;
  modalMessage: string = '';
  authService = inject(AuthService);
  

  form_Re = this.re_fb.group({
    full_name:['',[Validators.required,Validators.maxLength(12),Validators.minLength(6)]]!,
    email:['',[Validators.required,Validators.email,Validators.minLength(5)]]!,
    account_name: ['',[Validators.required,Validators.maxLength(12),Validators.minLength(6)]]!,
    password:['',[Validators.required,Validators.maxLength(12),Validators.minLength(6)]]!,
    rePassword:['',[Validators.required,Validators.maxLength(12),Validators.minLength(6)]]!
  });
  
  onSubmitRegister():void{
    if(this.form_Re.invalid){
       this.form_Re.markAllAsTouched();
       return
    }
    if(this.form_Re.value.password != this.form_Re.value.rePassword){
      this.form_Re.markAllAsTouched();
      return
    }
    localStorage.removeItem(LocalStorage.token);
      this.authService.register( this.form_Re.value as RegisterPayload).subscribe({
          next:(res)=>{
                    console.log(res);
                    this.modalVisible = true;
                    this.modalMessage = res.message+"";
          },
          error:(err)=>{
            this.modalVisible = true;
             this.modalMessage = err.error;
          },
          complete:()=>{
          
              console.log("ok");
              
          }
        }
      );
  }
  onModalClose(): void {
    this.modalVisible = false;
    this.modalMessage = "";
  }
}
