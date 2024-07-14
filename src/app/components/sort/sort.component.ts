import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.scss'
})
export class SortComponent {

sort!:string|null;
direction!:string|null;
@Output() sortChanged = new EventEmitter<{sort:string|null,direction:string|null}>();

changeSort (event: Event):void{
  const selectElement = event.target as HTMLSelectElement;
  const value = selectElement.value;

  if (value) {
    const [sort, direction] = value.split(',');
    this.sort = sort;
    this.direction = direction;
  } else {
    this.sort = null;
    this.direction = null;
  }
  this.sortChanged.emit({sort:this.sort,direction:this.direction})
  // console.log(value);
  
}

}
