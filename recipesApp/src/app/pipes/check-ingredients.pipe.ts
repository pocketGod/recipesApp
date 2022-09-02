import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../interfaces/Recipe';

@Pipe({
  name: 'checkIngredients',
})
export class CheckIngredientsPipe implements PipeTransform {
  transform(recipes: Recipe[], value: string): Recipe[] {
    let resArr: Recipe[] = [];
    for (let recipe of recipes) {
      for (let ingredient of recipe.ingredients) {
        if (ingredient.name == value) {
          resArr.push(recipe);
        }
      }
    }
    return resArr;
  }
}
