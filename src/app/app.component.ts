import { Recipe } from './recipes/recipe.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  featureLoaded: string = 'recipe';
  recipeLoaded: Recipe;
  onNavigate(feature: string) {
    this.featureLoaded = feature;
  }
  onRecipeSelect(recipe) {
    this.recipeLoaded = recipe;
  }
}
