import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product, Products } from '../../../type';
import { CartButtonComponent } from '../../components/cart-button/cart-button.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CartButtonComponent,CommonModule,RouterLink,LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent  {
  isLoading:boolean = false;
  productService= inject(ProductsService);
  products!:Product[];
  params:any={
  size:8
  }
  constructor(){
     this.loadProducts();
  }
 
  loadProducts():void{
    this.isLoading = true;
  this.productService.getProducts(this.params)
      .subscribe((product : Products)=>{
       this.products= product.content;
       this.isLoading = false
      })
  }

}
