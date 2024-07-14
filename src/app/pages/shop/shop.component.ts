import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product, Products } from '../../../type';
import { ProductComponent } from '../../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { SortComponent } from '../../components/sort/sort.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductComponent,
    PaginationComponent,SortComponent,
    FilterComponent,RouterLink,
    MatProgressSpinnerModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  schemas: [  CUSTOM_ELEMENTS_SCHEMA]
})
export class ShopComponent implements OnInit {
isLoading:boolean = false;

  products!:Products;
  page !:number|undefined;
  name!:String|null|undefined;
  sort!:string|null|undefined ;
  direction!:string|null|undefined;
  brand!:string|null;
  category!:string|null;
  minPrice!:Number|null;
  maxPrice!:Number|null;

  constructor(private prService:ProductsService,private route: ActivatedRoute){
  }

  ngOnInit(): void {
    this.category =  this.route.snapshot.queryParamMap.get('category')
      this.loadProduct();
  }
  loadProduct():void{
    this.isLoading = true;
    const params:any={
      page:this.page,
      name:this.name,
      sort:this.sort,
      direction:this.direction,
      brand:this.brand,
      category: this.category,
      minPrice:this.minPrice,
      maxPrice:this.maxPrice
    }
    Object.keys(params).forEach(key => {
      if (params[key] === null || params[key] === undefined) {
        delete params[key];
      }
    });
    const timeOut = 
      this.prService.getProducts(params)
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
  changedBrand(brand:string|null){
    this.brand = brand;
    this.loadProduct();
  }
  changedCategory(category:string|null){
    this.category = category;
    this.loadProduct();
  
  }
  changedSort(event:{sort:string|null,direction:string|null}){
    this.sort=event.sort;
    this.direction=event.direction;
    this.loadProduct();
  }

  changePrice(event:{ minPrice:Number|null,maxPrice:Number|null}){
    this.minPrice = event.minPrice;
    this.maxPrice= event.maxPrice;
    this.loadProduct()
  }
  changeName(name:string){
    this.name = name;
    this.loadProduct();
  }

}
