import { Injectable } from '@angular/core';
import { LocalStorage } from '../constans/constants';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

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
    return decodedToken ? decodedToken.userId : null;
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
  
  logout(): void {
    localStorage.removeItem(LocalStorage.token);
  }
}
