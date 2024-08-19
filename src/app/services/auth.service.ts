import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { ApiResponse, LoginPayload, RegisterPayload, UserInterface } from '../../type';
import { map } from 'rxjs';
import { LocalStorage } from '../constans/constants';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  registerUrl :string = "auth/register";
  loginUrl :string = "auth/authenticate";
  constructor(private service: ApiService) { }

  register(payload : RegisterPayload){
   return this.service.post<ApiResponse<any>>(this.registerUrl,payload)
  }

  login(payload : LoginPayload){
    return this.service.post<ApiResponse<UserInterface>>(this.loginUrl,payload)
    .pipe(map((response)=>{
      if(response.token){
        localStorage.setItem(LocalStorage.token,response.token);
      }
     return  response;
    }))
   }
   getToken(): string | null {
    return localStorage.getItem(LocalStorage.token);
    
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  getUserId(): number {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.sub : null;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decodedToken = this.getDecodedToken();
    const expirationDate = new Date(decodedToken.exp * 1000);
    return expirationDate > new Date();
  }
  
  getJwtToken(): string | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name.trim() === 'JWT_TOKEN') {
        return decodeURIComponent(value);
      }
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem(LocalStorage.token);
  }

}
