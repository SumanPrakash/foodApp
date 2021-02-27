import * as RecipesActions from './../store/recipe.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from 'src/app/store/app.reducer';
import { map, switchMap } from 'rxjs/operators';
import { arraysAreNotAllowedMsg } from '@ngrx/store/src/models';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      map(params => {
        return +params['id'];
      }),
      switchMap(id => {
        this.id = id;
        return this.store.select('recipes');
      }),
      map(recipesState => {
        return recipesState.recipes.find((recipe, index) => {
          return index == this.id;
        });
      })
    ).subscribe(recipe => {
      this.recipe = recipe
    });
  }

  onAddToShoppingList() {
    this.recipe.ingredients.forEach((element) => {
      this.store.dispatch(new ShoppingListActions.AddIngredient(element))
    });
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
