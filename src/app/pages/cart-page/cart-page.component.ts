import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../../type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
  schemas: [NO_ERRORS_SCHEMA , CUSTOM_ELEMENTS_SCHEMA]
})
export class CartPageComponent implements OnInit {
cartService = inject(CartService);
productService = inject(ProductsService);
cart: { [key: string]: number } = {};
cartItems: { product: Product, quantity: number }[] = [];

constructor(){}

ngOnInit(): void {
  this.cartService.getCartObservable().subscribe(cart=>{
    this.cart = cart;
     this.loadCartItems();
  });
}
loadCartItems():void{
  const productIds = Object.keys(this.cart);
  if (productIds.length > 0) {
    this.productService.getProductsByIds(productIds).subscribe(products => {
      this.cartItems = products.map(product => ({
        product,
        quantity: this.cart[product.id]
      }));
    });
  } else {
    this.cartItems = [];
  }
}
getTotalPrice():number{
  let totalPrice:number =0;
  this.cartItems.forEach(item=>{
    totalPrice += item.product.sale_price* item.quantity;
  })
  return totalPrice;
  }
plus(quantity:number,productId:string):void{
quantity+=1;
this.cartService.updateCart(productId,quantity);
}
minus(quantity:number,productId:string):void{
quantity-=1;
this.cartService.updateCart(productId,quantity);
}
deleteItem(productId:string){
  this.cartService.removeFromCart(productId);
}
}