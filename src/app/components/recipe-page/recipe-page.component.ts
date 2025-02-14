import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeStorageService } from '../../services/recipe-storage.service';
import { TRecipe } from '../../types/common';
import { RecipeComponent } from '../recipe/recipe.component';

@Component({
  selector: 'app-recipe-page',
  imports: [RecipeComponent],
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.scss',
})
export class RecipePageComponent {
  recipe?: TRecipe;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeStorageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.recipeService.getRecipeById(id).subscribe({
        next: (data) => {
          if (data) {
            this.recipe = data;
          } else {
            this.error = 'Recipe not found';
          }
        },
        error: (error) => {
          this.error = 'Error loading recipe';
          console.error('Error:', error);
        },
      });
    });
  }
}
