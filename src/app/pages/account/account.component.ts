import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './child/register/register.component';
import { LoginComponent } from './child/login/login.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterLink,RegisterComponent,LoginComponent , MatSnackBarModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]

})
export class AccountComponent {
   matSnackBar = inject(MatSnackBar);

  constructor() { 

  }
  loginAcc():void{
    this.matSnackBar.open("This feature is still under development.","",{duration:3000});

  }
}
