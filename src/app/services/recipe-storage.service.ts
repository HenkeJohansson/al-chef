import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TRecipe } from '../types/common';

@Injectable({
  providedIn: 'root',
})
export class RecipeStorageService {
  private recipesUrl = 'assets/mockRecipes.json';

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<TRecipe[]> {
    return this.http.get<TRecipe[]>(this.recipesUrl);
  }

  getRecipeById(id: string): Observable<TRecipe | undefined> {
    return this.http
      .get<TRecipe[]>(this.recipesUrl)
      .pipe(map((recipes) => recipes.find((recipe) => recipe.id === id)));
  }
}
