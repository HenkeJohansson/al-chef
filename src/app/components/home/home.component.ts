import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormComponent } from '../../components/form/form.component';
import { RecipeApiService } from '../../services/recipe-api.service';
import { RecipeStorageService } from '../../services/recipe-storage.service';
import { TOpenAIResponse, TRecipe } from '../../types/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private recipeApiService: RecipeApiService,
    private recipeService: RecipeStorageService,
    private router: Router
  ) {}

  generateRecipe(prompt: string) {
    this.recipeApiService.generateRecipe(prompt).subscribe({
      next: (response) => {
        const content = JSON.parse(
          response.choices[0].message.content
        ) as TOpenAIResponse;
        const recipe: TRecipe = {
          id: Date.now().toString(),
          name: content.title,
          ingredients: content.ingredients,
          steps: content.instructions,
        };

        // this.recipeService.addRecipe(recipe);
        // this.router.navigate(['/recipe', recipe.id]);
      },
      error: (error) => {
        console.error('Error generating recipe:', error);
      },
    });
  }
}
