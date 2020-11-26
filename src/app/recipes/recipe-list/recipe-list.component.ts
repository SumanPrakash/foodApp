import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'Pasta',
      'Cheesy pineapple pasta',
      'https://www.jessicagavin.com/wp-content/uploads/2018/03/cobb-salad-7B-1200.jpg'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}
}
