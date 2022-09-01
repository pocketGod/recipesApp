import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../interfaces/Recipe';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    recipes: Recipe[],
    recipeName: keyof Recipe,
    value: string
  ): Recipe[] {
    let resArr: Recipe[] = [];
    for (let recipe of recipes) {
      if (
        (recipe[recipeName] as string)
          .toLowerCase()
          .includes(value.toLowerCase())
      ) {
        resArr.push(recipe);
      }
    }
    return resArr;
  }
}
