import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { Store } from '@ngrx/store';
import { Actions, ofType } from "@ngrx/effects";
import * as RecipesActions from 'src/app/recipes/store/recipe.actions';
import { map, take, switchMap } from 'rxjs/operators';
import * as fromApp from 'src/app/store/app.reducer';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private store: Store<fromApp.AppState>, private actions$: Actions) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.store.select('recipes').pipe(
      take(1),
      map((recipesState => recipesState.recipes)),
      switchMap(recipes => {
        if (recipes.length === 0) {
          this.store.dispatch(new RecipesActions.FetchRecipes());
          return this.actions$.pipe(
            ofType(RecipesActions.SET_RECIPES),
            take(1)
          );
        } else {
          return of(recipes);
        }
      })
    );
  }
}
