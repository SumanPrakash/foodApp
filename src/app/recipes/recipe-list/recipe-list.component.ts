import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Recipe } from './../recipe.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as fromApp from 'src/app/store/app.reducer';

import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;

  constructor(private router: Router,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {

    this.subscription = this.store.select('recipes').pipe(
      map((recipesState) => {
        return recipesState.recipes;
      })
    ).subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });

  }

  onAddNewRecipe() {
    this.router.navigate(['/recipes/new']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
