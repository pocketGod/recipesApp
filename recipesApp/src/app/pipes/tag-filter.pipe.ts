import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../interfaces/Recipe';

@Pipe({
  name: 'tagFilter',
})
export class TagFilterPipe implements PipeTransform {
  transform(
    recipes: any,
    filters: any
  ): Recipe[] {

    if(!filters) return recipes

    let resArr = new Set()

    let keyArr = Object.keys(filters)
    let valArr = Object.values(filters)

    if(valArr.every( (filter: any)  => !filter)) return recipes
    else{
      return recipes[2]
    }



    return Array.from(resArr) as Recipe[]
  }
}
