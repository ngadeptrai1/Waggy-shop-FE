import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject, NO_ERRORS_SCHEMA, OnInit, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent implements OnInit {


  quantity:number = 0;
  currentRoute!: string;
  dropdownOpen = false;
  isLoggin:boolean = false;

  toggleDropdown(event: Event) {
    this.dropdownOpen = !this.dropdownOpen;
    event.stopPropagation();
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }
  constructor(private cartService:CartService,
    private router: Router,
    private authService:AuthService,
 
  ){
      document.addEventListener('click', () => this.closeDropdown());
    this.cartService = cartService;
    this.isLoggin = this.authService.isLoggedIn();
  }
  ngOnInit(): void {
     this.cartService.getCartObservable().subscribe(cartSubject=>{
        this.quantity = Object.keys(cartSubject).length ;
    })
  
  }
  logout():void{
      this.authService.logout();
      location.replace("/");
  }
}
