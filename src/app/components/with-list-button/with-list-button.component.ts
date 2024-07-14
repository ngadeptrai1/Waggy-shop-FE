import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-with-list-button',
  standalone: true,
  imports: [],
  templateUrl: './with-list-button.component.html',
  styleUrl: './with-list-button.component.scss',
  schemas: [  CUSTOM_ELEMENTS_SCHEMA]

})
export class WithListButtonComponent {
  @Input() productId!:string;
  userId!:number;
  constructor(
    private authService : AuthService,
    public snackBar:MatSnackBar,
    private userService:UserService){
  }

  likeProduct():void{
    if(!this.authService.isLoggedIn()){
      this.snackBar.open(" You need to login to continue ",'',{duration:2000})
      return;
    }
    this.userId = this.authService.getUserId();
    this.userService.likeProduct(Number.parseInt(this.productId),this.userId).subscribe({
      next:(val:any)=>{      
      },
      error(err) {
          console.log(err);
          
      },
    });
  }
}
