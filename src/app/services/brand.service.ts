import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Brand, PaginationParams } from '../../type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  url:String ="brands"
  constructor(private apiService : ApiService) { }
  getBrand(params:PaginationParams) :Observable<Brand[]>{
    return this.apiService.get(this.url,{
      params,
      responseType:"json"
    });
  }
}
