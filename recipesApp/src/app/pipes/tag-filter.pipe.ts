import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../interfaces/Recipe';

@Pipe({
  name: 'tagFilter',
})
export class TagFilterPipe implements PipeTransform {
  transform(
    recipes: Recipe[],
    recipeTag: keyof Recipe,
    value: string
  ): Recipe[] {
    let resArr: Recipe[] = [];
    for (let recipe of recipes) {
      if ((recipe[recipeTag] as string).toLowerCase().includes(value)) {
        resArr.push(recipe);
      }
    }
    return resArr;
  }
}
