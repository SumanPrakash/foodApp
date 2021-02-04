import { AuthService } from './../auth/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(private http: HttpClient, private authService: AuthService) { }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice(); // get a copy of recipes, not the actual data
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  saveRecipes() {
    this.http
      .put('https://recipe-2c7e1-default-rtdb.firebaseio.com/recipes.json', this.getRecipes())
      .subscribe((recipes: Recipe[]) => {
        this.setRecipes(recipes);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>('https://recipe-2c7e1-default-rtdb.firebaseio.com/recipes.json').pipe(
        map((recipes) => {
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
          });
        }),
        tap((recipes) => {
          this.setRecipes(recipes);
        })
      );
  }
}
