import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, NO_ERRORS_SCHEMA, OnInit, Output, SimpleChanges, input } from '@angular/core';
import { Products } from '../../../type';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  schemas: [NO_ERRORS_SCHEMA , CUSTOM_ELEMENTS_SCHEMA]

})
export class PaginationComponent  {
// @Input() products!:Products;
@Input() curentPage!:number ;
@Input() totalPages!:number;
@Output() pageChanged = new EventEmitter<number>();

changePage(number: number): void {
  this.pageChanged.emit(number);
}

}
