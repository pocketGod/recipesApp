import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../interfaces/Recipe';

@Pipe({
  name: 'checkIngredients',
})
export class CheckIngredientsPipe implements PipeTransform {
  transform(
    recipes: Recipe[],
    ingredients: keyof Recipe,
    value: string
  ): Recipe[] {
    let resArr: Recipe[] = [];
    for (let recipe of recipes) {
      if (
        (recipe[ingredients] as string)
          .toLowerCase()
          .includes(value.toLowerCase())
      ) {
        resArr.push(recipe);
      }
    }
    return resArr;
  }
}
