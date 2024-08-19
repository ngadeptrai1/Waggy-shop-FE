import { inject, Injectable } from '@angular/core';
import { LocalStorage } from '../constans/constants';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../type';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  snackBar = inject(MatSnackBar);
  private cart: { [key: string]: number } = {};
  private cartSubject: BehaviorSubject<{ [key: string]: number }> = new BehaviorSubject(this.getCart());

  constructor() {}

  getCart(): { [key: string]: number } {
    const cart = localStorage.getItem(LocalStorage.cart);
    return cart ? JSON.parse(cart) : {};
  }

  getCartObservable() {
    return this.cartSubject.asObservable();
  }

  private updateCartSubject(cart: { [key: string]: number }) {
    localStorage.setItem(LocalStorage.cart, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  addToCart(productId: string, quantity: number): void {
    const cart = this.getCart();

    if (cart[productId]) {
      cart[productId] += quantity;
    } else {
      cart[productId] = quantity;
    }

    this.snackBar.open("The product has been successfully added to the cart", '', { duration: 1000 });
    this.updateCartSubject(cart);
  }

  updateCart(productId: string, quantity: number): void {
    const cart = this.getCart();
    cart[productId] = quantity;
    this.updateCartSubject(cart);
  }

  removeFromCart(productId: string): void {
    const cart = this.getCart();
    delete cart[productId];
    this.updateCartSubject(cart);
  }

  clearCart() {
    const cart = {};
    this.updateCartSubject(cart);
    localStorage.removeItem(LocalStorage.cart);
  }
}
