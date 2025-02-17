import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RecipesComponent } from './components/recipes-page/recipes-page.component';
import { RecipePageComponent } from './components/recipe-page/recipe-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipe/:id', component: RecipePageComponent },
];
