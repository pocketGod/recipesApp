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
  }

  refreshRecipeArr():void{
    this.apiS.getRecipes().subscribe((data)=>{
      this.allRecipes = data    
    })
  }

  getRecipeByID(recipe_id: number):void{
    //761568 example recipe ID (pizza)
    this.apiS.getRecipeByID(recipe_id).subscribe((data)=>{
      console.log(data)
    })
  }




}
