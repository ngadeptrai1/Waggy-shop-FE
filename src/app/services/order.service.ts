import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Order } from '../../type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url : string = "orders";

  constructor(private apiService : ApiService) { }

  createOrder(order:Order):Observable<Order>{
    return this.apiService.post(this.url,order);
  }
  getOrdersByUserId(userId:unknown):Observable<Order[]>{
    return this.apiService.get(this.url+"/user/"+userId);
  }
}
