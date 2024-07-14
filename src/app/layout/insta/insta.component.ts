import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-insta',
  standalone: true,
  imports: [],
  templateUrl: './insta.component.html',
  styleUrl: './insta.component.scss',
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class InstaComponent {

}
