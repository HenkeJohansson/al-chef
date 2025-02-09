import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Output() onGenerateRecipe = new EventEmitter<string>();
  prompt: string = '';

  onSubmit() {
    if (this.prompt) {
      console.log('Generate Recipe', this.prompt);
      this.onGenerateRecipe.emit(this.prompt);
    }
  }
}
