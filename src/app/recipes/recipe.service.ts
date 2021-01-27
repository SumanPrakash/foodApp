import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Recipe } from "./recipe.model";

export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'Nutella was born of necessity in post-World War II',
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2015%2F07%2F3374029-Puff-Pastry-Waffles-Photo-by-foodelicious-650x465.jpg&q=85',
      [
        new Ingredient('slices cinnamon bread', 4),
        new Ingredient('cup milk', 1 / 4)
      ]
    ),
    new Recipe(
      'Puff Pastry Waffles',
      'Add puff pastry to the list of good things',
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F3374022.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
    )
  ];

  getRecipes() {
    return this.recipes.slice(); // get a copy of recipes, not the actual data
  }
}
