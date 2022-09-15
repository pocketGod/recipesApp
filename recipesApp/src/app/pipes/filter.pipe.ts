import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../interfaces/Recipe';
import { ApiService } from '../services/api.service';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  constructor(private apiS:ApiService){}
  transform(recipes: Recipe[], value: string, tagArr: string[], pipeType:string): Recipe[] {
    let resArr = new Set();

    if(pipeType == 'favorites'){
      if((!this.apiS.getLocalStorageData('likesArr'))){
        this.apiS.setLocalStorageData('likesArr', '[]')
      }
      JSON.parse(this.apiS.getLocalStorageData('likesArr')).forEach((id:string)=>{
        recipes.forEach((rcp)=>{
          if(rcp.recipe_id == id){
            resArr.add(rcp)
          }
        })
      })
      return Array.from(resArr) as Recipe[]
    }

    for (let recipe of recipes) {
      if (recipe.title.toLowerCase().includes(value.toLowerCase())) resArr.add(recipe)
      recipe.ingredients.forEach((ing) => {
        if (ing.name.includes(value.toLowerCase())) resArr.add(recipe)
      })
    }

    if (tagArr.length == 0) return Array.from(resArr) as Recipe[]

    let filteredArr = new Set()

    resArr.forEach((rcp: any) => {
      tagArr.forEach((tag:string) => {
        if (rcp.tags.includes(tag)) filteredArr.add(rcp)
      })
    })

    return Array.from(filteredArr) as Recipe[]
  }
}
