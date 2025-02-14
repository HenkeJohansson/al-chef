import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecipeStorageService } from '../../services/recipe-storage.service';
import { TRecipe } from '../../types/common';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  recipes: TRecipe[] = [];

  constructor(private recipeService: RecipeStorageService) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((data) => {
      this.recipes = data;
    });
  }
}
