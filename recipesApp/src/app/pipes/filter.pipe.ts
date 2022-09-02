import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../interfaces/Recipe';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    recipes: Recipe[],
    value: string
  ): Recipe[] {
    let resArr = new Set()
    for (let recipe of recipes) {
      if (recipe.title.includes(value)) resArr.add(recipe)
      recipe.ingredients.forEach((ing)=>{
        if(ing.name.includes(value)) resArr.add(recipe)
      })
    }


    return Array.from(resArr) as  Recipe[]
  }
}
