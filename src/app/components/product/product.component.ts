import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { Product } from '../../../type';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartButtonComponent } from '../cart-button/cart-button.component';
import { WithListButtonComponent } from '../with-list-button/with-list-button.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink,CartButtonComponent,CommonModule,WithListButtonComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  schemas: [NO_ERRORS_SCHEMA , CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductComponent {
@Input() product!:Product;
}
