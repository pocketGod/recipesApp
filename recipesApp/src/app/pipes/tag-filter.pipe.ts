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

    if(filters.every((x:boolean)=> x==false)) return recipes

    let resArr = new Set()

    let keyArr = Object.keys(filters)
    let valArr = Object.values(filters)

    recipes.forEach((rcp:Recipe)=>{
      for (let i = 0; i < valArr.length; i++) {
        if(rcp.tags.includes(keyArr[i]) && valArr[i]) resArr.add(rcp)
      }
    })



    return Array.from(resArr) as Recipe[]
  }
}
