import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AccountComponent } from './pages/account/account.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { WishListComponent } from './pages/wish-list/wish-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent
    },
{
        path:'shop',
        component: ShopComponent
    },
    {
        path:'cart',
        component: CartPageComponent
    },
    {
        path:'about-us',
        component: AboutUsComponent
    },
    {
        path:'account',
        component: AccountComponent
    },
    {
        path:'check-out',
        component: CheckOutComponent,canActivate: [AuthGuard]
    },
    {
        path:'contact',
        component: ContactComponent
    },
    {
        path:'detail/:id',
        component: ProductDetailComponent
    },
    {
        path:'my-orders',
        component: MyOrdersComponent,canActivate:[AuthGuard]
    },
    {
        path:'wish-list',
        component: WishListComponent,canActivate: [AuthGuard]
    },
    { 
        path: '**',
         component: NotFoundComponent }
];
