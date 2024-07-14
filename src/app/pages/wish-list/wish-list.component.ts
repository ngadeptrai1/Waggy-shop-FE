import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Product, Products } from '../../../type';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { AuthService } from '../../services/auth.service';
import { CartButtonComponent } from '../../components/cart-button/cart-button.component';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CommonModule,RouterLink,PaginationComponent,LoadingComponent,CartButtonComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {

  currentUserid!:number ;
  userServices = inject(UserService);
  authService = inject(AuthService);
  router = inject(Router);
  products!:Products;
  page:number = 0;
  size:number = 5;
  isLoading:boolean = false;


  ngOnInit(): void {
    this.currentUserid = this.authService.getUserId();
    console.log('hehe'+ this.currentUserid);
    this.loadProduct();
    
    
  }

 loadProduct():void{
    this.isLoading = true;
    const params:any={
      page:this.page,
      size: this.size
    }
    Object.keys(params).forEach(key => {
      if (params[key] === null || params[key] === undefined) {
        delete params[key];
      }
    });
      this.userServices.getProductsLike( this.currentUserid, params)
      .subscribe((product : Products)=>{
       this.products= product;
      setTimeout(()=>{
       this.isLoading = false;
    },100)
      })
  }
  changedPage(page:number){
    this.page =page;
    this.loadProduct();
  }
  
}
