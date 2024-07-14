import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.scss',
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class ThankYouComponent {

}
