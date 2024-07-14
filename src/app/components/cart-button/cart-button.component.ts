import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-button',
  standalone: true,
  imports: [],
  templateUrl: './cart-button.component.html',
  styleUrl: './cart-button.component.scss',
  schemas: [  CUSTOM_ELEMENTS_SCHEMA]
})
export class CartButtonComponent {

  @Input() productId!:string;
  @Input() quantity!:number;
  userId!:number;
  constructor(private cartService : CartService , 
    private authService : AuthService,
    private snackBar:MatSnackBar,
    private userService:UserService){
  }
  addToCart(){
    if(!this.productId){
      return;
    }
    if(this.quantity<=0){
      return;
    }
    this.cartService.addToCart(this.productId,this.quantity);
    console.log("hehe");
    
  
  }



}
