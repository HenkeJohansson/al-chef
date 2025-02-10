import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  generateRecipe(prompt: string) {
    console.log(`Generate Recipe based on ${prompt}`);
  }
}
