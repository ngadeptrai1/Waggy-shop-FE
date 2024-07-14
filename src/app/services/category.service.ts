import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Category, PaginationParams } from '../../type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url:String ="categories"
  constructor(private apiService : ApiService) { }
  getCategories(params:PaginationParams) :Observable<Category[]>{
    return this.apiService.get(this.url,{
      params,
      responseType:"json"
    });
  }
}
