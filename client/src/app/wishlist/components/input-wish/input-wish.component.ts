import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-wish',
  standalone: true,
  imports: [],
  templateUrl: './input-wish.component.html',
  styleUrl: './input-wish.component.css'
})
export class InputWishComponent {
  @Input() buttonLabel: string = 'Add';
  @Input() buttonClass: string = 'btn bg-orange-200 rounded-full w-1/5 cursor-pointer hover:bg-orange-400 border border-white';
  @Output() buttonClick = new EventEmitter<void>();
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  onValueChange(newValue: string) {
    this.value = newValue;
    this.valueChange.emit(newValue);
  }

  onButtonClick() {
    this.buttonClick.emit();
  }
}
