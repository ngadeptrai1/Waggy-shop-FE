import { Component, OnInit } from '@angular/core';
import { Product } from '../../../type';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  products!:Product[];
  product!:any;
  cart: { [key: string]: number } = {};
  cartItems: { product: Product, quantity: number }[] = [];

  constructor( private cartService:CartService,private productService:ProductsService){
    
  }
  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe(cart=>{
      this.cart = cart;
       this.loadCartItems();
    });
  }

loadCartItems(): void {
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
}
