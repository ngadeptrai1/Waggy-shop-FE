import { Component, inject, OnInit } from '@angular/core';
import { Order, Order_detail, Product } from '../../../type';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { AuthService } from '../../services/auth.service';
import { ThankYouComponent } from '../thank-you/thank-you.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [ReactiveFormsModule,ModalComponent,RouterLink,ThankYouComponent,LoadingComponent,NgxSpinnerModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})

export class CheckOutComponent implements OnInit {
  isSendOrder = false;
  isLoading = true;
  isOrder = false;
  router= inject(Router);
  snackBar = inject(MatSnackBar);
  authService= inject(AuthService);
  cartService = inject(CartService);
  productService = inject(ProductsService);
  orderService= inject(OrderService);
  orderDetails!:Order_detail[];
  spinner = inject(NgxSpinnerService);
  private fb= inject(NonNullableFormBuilder);
  modalVisible: boolean = false;
  modalMessage: string = '';
  cartItems: { product: Product, quantity: number }[] = [];
  cart: { [key: string]: number } = {};
    orderForm = this.fb.group({
    fullName: ['',[ Validators.required , Validators.minLength(6)]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    address: ['',[ Validators.required , Validators.minLength(6)]],
    note: ['']
  });


ngOnInit(): void {
  if (!this.authService.isLoggedIn()) {
    this.router.navigate(['/account']);
    return;
  }
  this.cartService.getCartObservable().subscribe(cart=>{
    this.cart = cart;
    this.loadCartItems();
   
  });
}
 onSubmit(): void {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }

    const userId = this.authService.getUserId();
    if (!userId) {
      console.log("id not found");
      
      this.router.navigate(['/account'], { queryParams: { auth: 'required' } });
      return;
    }

    const orderDetails: Order_detail[] = this.cartItems.map(item => ({
      product_id: item.product.id,
      quantity: item.quantity
    }));

    const order: Order = {
      user_id: userId,
      full_name: this.orderForm.value.fullName+"",
      phone_number: this.orderForm.value.phoneNumber+"",
      address: this.orderForm.value.address+"",
      note: this.orderForm.value.note+"",
      status: 'Pending',
      created_date: new Date(),
      total_money: this.getTotalPrice(),
      discount_money: this.getTotalPrice(),
      quantity_product: this.cartItems.length,
      attribute_discount: 0,
      code: '',
      order_details: orderDetails
    };
    this.isLoading = true;
    this.showSpin();
this.createOrder(order);
  }

createOrder(order:Order):void{
  this.isOrder = true;
  this.orderService.createOrder(order).subscribe({
    next:(data)=> {
        console.log(data);
        this.isSendOrder = true;
        this.isLoading = false;
        this.showSpin();
    },
    error:(err)=> {
      console.log(err);
        this.snackBar.open("Some thing went wrong please try again ","",{duration:2000})
    },
    complete:()=> {
      this.cartService.clearCart();

    },
  });
}

 onModalClose(): void {
    this.modalVisible = false;
    this.modalMessage = "";
  }

loadCartItems():void{
  this.isLoading = true;
  this.showSpin();
  const productIds = Object.keys(this.cart);
  if (productIds.length > 0) {
    this.productService.getProductsByIds(productIds).subscribe(products => {
      this.cartItems = products.map(product => ({
        product,
        quantity: this.cart[product.id]
      
      }));
    });
    this.isLoading = false;
    this.showSpin();
  } else {
        this.isLoading = false
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

  private showSpin():void{
    if(this.isLoading){
      this.spinner.show();
    }
    else{
      this.spinner.hide()
    }
  } 
}


