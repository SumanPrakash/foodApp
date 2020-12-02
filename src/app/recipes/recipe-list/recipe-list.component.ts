import { Recipe } from './../recipe.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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
    new Recipe(
      'Recipe1',
      'This is recipe 1',
      'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/04/shakshuka-egg-1296x728-header.jpg?w=1155&h=1528'
    ),
    new Recipe(
      'Recipe2',
      'This is recipe 2',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjoC0llcLubuz4fC0oCTfuA03V_fsqqPgSA&usqp=CAU'
    ),
  ];

  @Output() recipeSelected = new EventEmitter<Recipe>();

  constructor() {}

  ngOnInit(): void { }

  onSelect(recipe) {
    this.recipeSelected.emit(recipe);
  }
}
