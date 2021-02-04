import { Subscription } from 'rxjs';
import { Recipe } from './../recipe.model';
import { RecipeService } from './../recipe.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;

  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.recipeService.fetchRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });

    this.subscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
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
