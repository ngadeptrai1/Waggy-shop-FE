import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  matSnackBar = inject(MatSnackBar);
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      console.log("hehe");
      
      this.matSnackBar.open("Loggin Successfuly","OK",{duration:3000,direction:"ltr"})
      this.router.navigate(['/account'], { queryParams: { auth: 'required' } });
      return false;
    }
    return true;
  }
}
