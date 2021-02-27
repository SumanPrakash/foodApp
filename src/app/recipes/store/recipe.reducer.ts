import { Recipe } from "../recipe.model";
import * as RecipesActions from 'src/app/recipes/store/recipe.actions';
import { act } from "@ngrx/effects";

export interface State {
  recipes: Recipe[];
  editedRecipe: Recipe;
  editedRecipeIndex: number;
}

const initialState: State = {
  recipes: [],
  editedRecipe: null,
  editedRecipeIndex: -1
};

export function recipeReducer(state = initialState, action: RecipesActions.RecipesActions) {
  switch (action.type) {
    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipesActions.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe
      };
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;

      return {
        ...state,
        recipes: updatedRecipes
      };

    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          index !== action.payload;
        })
      };

    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };

    default:
      return state;
  }
}
