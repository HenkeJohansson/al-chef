import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { TRecipe } from '../types/common';

@Injectable({
  providedIn: 'root',
})
export class RecipeStorageService {
  private readonly STORAGE_KEY = 'RESIPES';
  private recipesUrl = 'assets/mockRecipes.json';

  constructor(private http: HttpClient) {}

  private getStoredRecipes(): TRecipe[] {
    const recipesJson = localStorage.getItem(this.STORAGE_KEY);
    return recipesJson ? JSON.parse(recipesJson) : [];
  }

  private saveToStorage(recipes: TRecipe[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(recipes));
  }

  getRecipes(): Observable<TRecipe[]> {
    return of(this.getStoredRecipes());
  }

  getRecipeById(id: string): Observable<TRecipe | undefined> {
    const recipes = this.getStoredRecipes();
    return of(recipes.find((recipe) => recipe.id === id));
  }

  saveRecipe(recipe: TRecipe): Observable<TRecipe> {
    const recipes = this.getStoredRecipes();
    recipes.push(recipe);
    this.saveToStorage(recipes);
    console.group('RecipeStorageService - saveRecipe');
    console.log({ recipe });
    console.log({ recipes });
    console.groupEnd();
    return of(recipe);
  }
}
