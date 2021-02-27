import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Effect, Actions, ofType } from "@ngrx/effects";
import * as RecipesActions from 'src/app/recipes/store/recipe.actions';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import * as fromApp from 'src/app/store/app.reducer';

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http
        .get<Recipe[]>('https://recipe-2c7e1-default-rtdb.firebaseio.com/recipes.json')
    }),
    map((recipes) => {
      return recipes.map(recipe => {
        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
      });
    }),
    map((recipes) => {
      return new RecipesActions.SetRecipes(recipes);
    })
  );

  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      return this.http
        .put('https://recipe-2c7e1-default-rtdb.firebaseio.com/recipes.json',
          recipesState.recipes)
    })
  );

  constructor(private actions$: Actions, private http: HttpClient,
    private store: Store<fromApp.AppState>) { }
}
