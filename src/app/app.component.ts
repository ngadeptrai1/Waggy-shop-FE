import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RegisterComponent } from './layout/register/register.component';
import { InstaComponent } from './layout/insta/insta.component';
import { ServiceComponent } from './layout/service/service.component';
import { CartComponent } from './pages/cart/cart.component';
import { SearchComponent } from './pages/search/search.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet
    ,RouterLink
    ,HeaderComponent
    ,FooterComponent
    ,RegisterComponent
    ,InstaComponent
    ,ServiceComponent
    ,CartComponent
    ,SearchComponent ,
    MatSnackBarModule,
    MyOrdersComponent
  
  ],
  providers:[
    MatSnackBarModule,
    BrowserAnimationsModule,
    AuthService,
    CookieService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  title = 'my-angular-app';
ngOnInit(): void {
  console.log(this.authService.getToken()+"token");
    if(!this.authService.isLoggedIn()){
      this.authService.logout();
    }
   
}
}
