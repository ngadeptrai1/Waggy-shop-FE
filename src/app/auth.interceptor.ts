import {  HttpInterceptorFn } from "@angular/common/http";
import { LocalStorage } from "./constans/constants";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

export const authInteceptor:HttpInterceptorFn =(request,next)=>{
   const router = inject(Router);
    const token = localStorage.getItem(LocalStorage.token)??'';
    request = request.clone({
        setHeaders:{
            Authorization: token ?`Bearer ${token}`:'',
        }
    })
    return next(request)
}
