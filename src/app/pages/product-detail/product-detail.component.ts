import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Product } from '../../../type';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartButtonComponent } from '../../components/cart-button/cart-button.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule,CartButtonComponent,RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  schemas: [NO_ERRORS_SCHEMA , CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product!: Product;
  errorMessage!: string;
  quantity:number = 1;
  isLoadding:boolean = false;

constructor(private productService: ProductsService,
  private router: Router,
  private route: ActivatedRoute){

}
  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
        const id = +param;
        this.getProduct(id);
    }
  }
  getProduct(id: number) {
    this.isLoadding = true;
    this.productService.getProduct(id).subscribe( 
      {next:(product:Product)=> {
           this.product = product
          this.isLoadding = false;
      },
      error(err) {
          console.log(err);
          
      },
    }
  
    ); 
}
onBack(): void {
  this.router.navigate(['/shop']);
}

  plus():void{
if(this.quantity == this.product.quantity){
  return;
}
  this.quantity+=1;
}

  minus():void{
  if(this.quantity <= 1){
    return;
  }
  this.quantity -= 1;
}

}
