import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormComponent } from '../form/form.component';
import { RecipeApiService } from '../../services/recipe-api.service';
import { RecipeStorageService } from '../../services/recipe-storage.service';
import { TRecipe } from '../../types/common';
import { RecipeComponent } from '../recipe/recipe.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormComponent, RecipeComponent, ButtonComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  recipe?: TRecipe;
  error: string = '';

  constructor(
    private recipeApiService: RecipeApiService,
    private recipeStorageService: RecipeStorageService,
    private router: Router
  ) {}

  generateRecipe(prompt: string) {
    console.log('home.component - generateRecipe', { prompt });
    this.recipeApiService.generateRecipe(prompt).subscribe({
      next: (response) => {
        const content = JSON.parse(response.choices[0].message.content);

        const data: TRecipe = {
          id: Date.now().toString(),
          name: content.title,
          ingredients: content.ingredients,
          steps: content.steps,
        };

        if (data) {
          console.log('res', { data });
          this.recipe = data;
        } else {
          this.error = 'Recipe not found';
        }

        // this.recipeStorageService.addRecipe(recipe);
        // this.router.navigate(['/recipe', recipe.id]);
      },
      error: (error) => {
        console.error('Error generating recipe:', error);
      },
    });
  }

  saveRecipe() {
    console.log('home-page.component', { recipe: this.recipe });
    if (this.recipe) {
      this.recipeStorageService.saveRecipe(this.recipe);
    }
  }
}
