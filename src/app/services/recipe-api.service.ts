import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import OpenAI from 'openai';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipeApiService {
  private openai = new OpenAI({
    apiKey: environment.openaiApiKey,
    dangerouslyAllowBrowser: true,
  });

  constructor(private http: HttpClient) {}

  generateRecipe(prompt: string): Observable<any> {
    return from(
      this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              'Return recipe in json format exactly like this: { "title": "Give it a short fancy name based on the recipe, "ingredients": ["Ingredient 1", "Ingredient 2"], "instructions": ["Step 1", "Step 2"] }',
          },
          { role: 'user', content: prompt },
        ],
      })
    );
  }
}
