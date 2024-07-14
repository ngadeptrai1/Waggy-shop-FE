import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { forkJoin, Observable } from 'rxjs';
import { PaginationParams, Product, Products } from '../../type';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url:String ="products"
  constructor(private apiService : ApiService) { }
  getProducts(params:PaginationParams) :Observable<Products>{
    return this.apiService.get(this.url,{
      params,
      responseType:"json"
    });
  }

  getProduct(id:any) :Observable<Product>{
    return this.apiService.get(this.url+"/"+id)
  }
  getProductsByIds(ids: string[]): Observable<Product[]> {
    const requests = ids.map(id => this.getProduct(id));
    return forkJoin(requests);
  }

}
