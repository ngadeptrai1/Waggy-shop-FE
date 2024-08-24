import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { Brand, Category, PaginationParams } from '../../../type';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Input() currentBrand!:String|null;
  @Input() currentCate!:String|null;
  @Input() currentMaxPrice!:Number|null;
  @Input() currentMinPrice!:Number|null;

  @Output()priceChanged = new EventEmitter<{minPrice:Number|null,maxPrice:Number|null}> ;
  @Output()selectedBrand  = new EventEmitter<string|null> ;
  @Output()selectedCategory  = new EventEmitter<string|null> ;
  @Output()nameFilling = new EventEmitter<string>;
  brandService:BrandService ;
  categoryService:CategoryService;
  brands : Brand[] = [];
  categories: Category[] = [];
  params:PaginationParams ={page:0,size:5,sort:'id',direction:'ASC'};

  constructor(brandService:BrandService,categoryService:CategoryService){
    this.brandService = brandService;
    this.categoryService = categoryService;
    this.getBrands();
    this.getCategories();    
  }

  getBrands():void{
     this.brandService.getBrand(this.params).subscribe(
      (brands)=>{
       this.brands = brands;
       console.log(this.brands);
       
      }
     );
}
getCategories():void{
  this.categoryService.getCategories(this.params).subscribe(
    (categories:Category[])=>{
      this.categories = categories;
    }
  )
}

selectBrand(brandName:string|null):void{
  if (this.currentBrand == brandName) {
    this.selectedBrand.emit(null);
  } else {
    this.selectedBrand.emit(brandName);
  }
}
selectCategory(cateName:string):void{
  if(this.currentCate == cateName){
   this.selectedCategory.emit(null);
  }else{
    this.selectedCategory.emit(cateName);
  }
}

selectPrice(minPrice:number,maxPrice:number):void{
const price ={
  maxPrice:this.currentMaxPrice,
  minPrice: this.currentMinPrice
}
  if(this.currentMaxPrice == maxPrice){
    price.maxPrice = null;
  }else{
    price.maxPrice = maxPrice;
  }

  if(this.currentMinPrice == minPrice){
    price.minPrice = null;
  }else{
    price.minPrice = minPrice;
  }
this.priceChanged.emit(price)
}

filteringProductName(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const value = inputElement.value;
  this.nameFilling.emit(value);
}

}

