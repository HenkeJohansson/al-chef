import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, tap, of } from 'rxjs';
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

  private prompts: OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content:
        'Return only a recipe in json format with a title that is a string, an array of ingredients that are strings and an array of steps that are strings.',
    },
  ];

  constructor(private http: HttpClient) {}

  generateRecipe(prompt: string): Observable<any> {
    this.prompts.push({ role: 'user', content: String(prompt) });

    return from(
      this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: this.prompts,
      })
    ).pipe(
      tap((response) => {
        if ('choices' in response) {
          this.prompts.push({
            role: 'assistant',
            content: response.choices[0].message.content,
          });
        }
      })
    );
  }

  generateMockRecipe(prompt: string): Observable<any> {
    console.log('recipe-api.service - generateMockRecipe', { prompt });
    const mockRecipe = {
      title: 'Kyckling- och quinoasallad med pesto',
      ingredients: [
        '400 g kycklingfilé',
        '2 dl quinoa',
        '1 röd paprika',
        '1 gurka',
        '1 dl solrosfrön',
        'Färsk basilika',
        'Färsk spenat',
        'Olivolja',
        'Citronsaft',
        'Salt',
        'Peppar',
      ],
      steps: [
        'Koka quinoan enligt anvisningarna på förpackningen och låt svalna.',
        'Stek kycklingfiléerna i olivolja tills de är genomstekta och krydda med salt och peppar.',
        'Skär paprikan, gurkan och kycklingen i bitar och lägg i en stor skål.',
        'Tillsätt quinoa, solrosfrön, hackad basilika och spenat i skålen.',
        'Ringla över olivolja och pressa över citronsaft.',
        'Blanda väl och smaka av med salt och peppar.',
        'Fördela salladen i matlådor och förvara i kylen tills det är dags att äta.',
      ],
    };
    return of({
      choices: [
        {
          message: {
            content: JSON.stringify(mockRecipe),
          },
        },
      ],
    });
  }
}
