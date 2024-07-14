import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() modalVisible: boolean = false;
  @Input() modalMessage: string = '';
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  onClose() {
    this.modalVisible = false;
    this.closeModal.emit();
  }
}
