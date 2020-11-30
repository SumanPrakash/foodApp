import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Potato', 100),
    new Ingredient('Cucumber', 200),
    new Ingredient('Onion', 50),
  ];

  constructor() {}

  ngOnInit(): void {}
}
