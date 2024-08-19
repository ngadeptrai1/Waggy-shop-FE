import {  HttpInterceptorFn } from "@angular/common/http";
import { LocalStorage } from "./constans/constants";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { CookieService } from "ngx-cookie-service";

export const authInteceptor:HttpInterceptorFn =(request,next)=>{
   const router = inject(Router);
   const cookie = inject(CookieService);
   const token = cookie.get("123");
    request = request.clone({
        setHeaders:{
            Authorization: token ?`Bearer ${token}`:'',
        }
    })
    return next(request)
}
