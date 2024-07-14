import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { PaginationParams, Products } from '../../type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:String ="users"
  constructor(private apiService : ApiService) { }
  getProductsLike(userId:number,
    params:PaginationParams) :Observable<Products>{
    return this.apiService.get(this.url+"/like/"+userId,{
      params,
      responseType:"json"
    });
  }
  likeProduct(productId:number , userId:number):Observable<any>{
    return this.apiService.post(this.url+'/like',{userId:userId,productId:productId})
  }
}
