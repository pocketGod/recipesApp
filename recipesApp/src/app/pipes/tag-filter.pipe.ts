import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../interfaces/Recipe';

@Pipe({
  name: 'tagFilter',
})
export class TagFilterPipe implements PipeTransform {
  transform(recipes: Recipe[], searchTerm: string, tags?: string[]): Recipe[] {
    // check null
    if(!recipes?.length || searchTerm == undefined)
      return recipes;
    
    let resArr = []

    // find search term in all fields
    resArr = recipes.filter(res => JSON.stringify(res).includes(searchTerm))

    // filter recipe by tags
    if(tags?.length)
      resArr = resArr.filter(res => {
        for(let tag in tags)
          if(res.tags.includes(tag))
            return true

        return false
      })

    return resArr
  }
}
