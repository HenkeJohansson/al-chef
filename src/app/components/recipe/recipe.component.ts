import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TRecipe } from '../../types/common';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent {
  @Input() recipe?: TRecipe;
}
