import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecipeApiService } from '../../services/recipe-api.service';

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

  constructor(private recipeApiService: RecipeApiService) {}

  onSubmit() {
    console.log('form.component - onSubmit', { prompt: this.prompt });
    if (this.prompt) {
      this.recipeApiService.generateRecipe(this.prompt).subscribe({
        next: (response) => {
          const generatedRecipe = JSON.parse(
            response.choices[0].message.content
          );
          console.log('Recipe generated:', generatedRecipe);
          this.onGenerateRecipe.emit(response);
          this.prompt = '';
        },
        error: (error) => {
          console.error('Error generating recipe:', error);
        },
      });
      // this.recipeApiService.generateMockRecipe(this.prompt).subscribe({
      //   next: (response) => {
      //     console.log('Recipe generated:', response);
      //     this.onGenerateRecipe.emit(response);
      //     this.prompt = '';
      //   },
      //   error: (error) => {
      //     console.error('Error generating recipe:', error);
      //   },
      // });
    }
  }
}
