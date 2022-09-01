import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from 'src/app/interfaces/Recipe';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-show-recipes',
  templateUrl: './show-recipes.component.html',
  styleUrls: ['./show-recipes.component.css']
})
export class ShowRecipesComponent implements OnInit {

  allRecipes: Recipe[] = []

  constructor(private apiS: ApiService) { }

  ngOnInit(): void {
    this.refreshRecipeArr()

    // this.apiS.getRecipes().subscribe((data)=>console.log(data))

  }

  refreshRecipeArr():void{
    this.apiS.getRecipes().subscribe((data)=>{
      this.allRecipes = data    
    })
  }






  getRecipeByID(recipe_id: number):void{
    //761568  - example recipe ID (pizza)
    this.apiS.getRecipeByID(recipe_id).subscribe((data)=>{
      console.log(data)
    })
  }
  getRecipeByTag(tag:string){
    //easy to make -  example tag ID (pizza, omelette)
    this.apiS.getRecipesByTag(tag).subscribe((data)=>{
      console.log(data)
    })
  }
  editRecipeData(recipe:Recipe, ID:number){
    // two paramaters because some reciepes wont have a convient to reach ID in the template. (all reciepes have ID in the DB)
    this.apiS.editRecipeData(recipe, ID).subscribe((rcpData)=>{
      console.log('Update Succesfull')
      console.log(rcpData)
    })
  }
  deleteReciepe(ID:number){
    this.apiS.deleteRecipe(ID).subscribe((data)=>{
      console.log(data)
    })
  }

}
