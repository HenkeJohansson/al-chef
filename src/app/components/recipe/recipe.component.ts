import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { TRecipe } from '../../types/common';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
})
export class RecipeComponent implements OnInit {
  recipe?: TRecipe;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
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
