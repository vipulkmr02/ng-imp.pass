import { Component, inject } from '@angular/core';
import { UiService } from '../ui.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  public ui = inject(UiService);
}
