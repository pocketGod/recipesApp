import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from 'src/app/interfaces/Recipe';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-show-recipes',
  templateUrl: './show-recipes.component.html',
  styleUrls: ['./show-recipes.component.css'],
})
export class ShowRecipesComponent implements OnInit {
  allRecipes: Recipe[] = [];

  constructor(private apiS: ApiService) {}

  ngOnInit(): void {
    this.refreshRecipeArr();

    // this.apiS.getRecipes().subscribe((data)=>console.log(data))
    // this.getRecipeByID(526222)
    // this.getRandomRecipeByTag('sweet')
    // this.getRecipesByMainIng('egg')
    // this.getAllTags()
  }

  refreshRecipeArr(): void {
    this.apiS.getRecipes().subscribe((data) => {
      this.allRecipes = data;
    });
  }

  getRecipeByID(recipe_id: string): void {
    //526222  - example (pizza)
    this.apiS.getRecipeByID(recipe_id).subscribe((data) => {
      console.log(data);
    });
  }
  getRecipesByTag(tag: string) {
    //"easy to make" or "sweet" -  example
    this.apiS.getRecipesByTag(tag).subscribe((data) => {
      console.log(data);
    });
  }
  getRandomRecipeByTag(tag: string) {
    // "any" - random among all
    // "quick" - example
    this.apiS.getRandomRecipe(tag).subscribe((data) => {
      console.log(data);
    });
  }
  getRecipesByMainIng(ing: string) {
    // "egg" - example
    this.apiS.getRecipesByMainIng(ing).subscribe((data) => {
      console.log(data);
    });
  }
  getAllTags() {
    this.apiS.getAllTags().subscribe((data) => {
      console.log(data);
    });
  }

  editRecipeData(recipe: Recipe, ID: string) {
    // two paramaters because some reciepes wont have a convient to reach ID in the template. (all reciepes have ID in the DB)
    this.apiS.editRecipeData(recipe, ID).subscribe((rcpData) => {
      console.log('Update Succesfull');
      console.log(rcpData);
      this.refreshRecipeArr();
    });
  }

  deleteReciepe(ID: string) {
    this.apiS.deleteRecipe(ID).subscribe((data) => {
      console.log(data);
      this.refreshRecipeArr();
    });
  }
  addNewRecipe(recipe: Recipe) {
    this.apiS.addNewRecipe(recipe).subscribe((data) => {
      console.log(data);
      this.refreshRecipeArr();
    });
  }
}
