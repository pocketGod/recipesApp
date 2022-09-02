import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../interfaces/Recipe';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    recipes: Recipe[],
    value: string,
    tagArr: string[]
  ): Recipe[] {
    let resArr = new Set()
    for (let recipe of recipes) {
      if (recipe.title.includes(value)) resArr.add(recipe)
      recipe.ingredients.forEach((ing)=>{
        if(ing.name.includes(value)) resArr.add(recipe)
      })
    }

    if(tagArr.length == 0) return Array.from(resArr) as  Recipe[]

    let filteredArr = new Set()

    resArr.forEach((rcp:any)=>{
      tagArr.forEach((tag)=>{
        if(rcp.tags.includes(tag)) filteredArr.add(rcp)
      })
    })



    return Array.from(filteredArr) as  Recipe[]
  }
}
