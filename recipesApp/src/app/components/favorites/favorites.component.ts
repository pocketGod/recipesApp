import { Component, Input, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { json } from 'express';
import { Recipe } from 'src/app/interfaces/Recipe';
import { ApiService } from 'src/app/services/api.service';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(500),
      ]),
      transition('* <=> void', [
        animate(400, style({ opacity: 0, transform: 'translateY(20px)' })),
      ]),
    ]),
  ],
})
export class FavoritesComponent implements OnInit {
  tags: string[] = [];
  allIngredients: string[] = [];
  favoritesId: string[] = [];
  recipesArr: Recipe[] = [];
  favoriteRecipeArr: Recipe[] = [];
  setOrder: string = '';

  @Input() tagFilters: { [key: string]: boolean } = {};

  constructor(
    private apiService: ApiService,
    private offCanvas: NgbOffcanvas
  ) {}

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes() {
    this.apiService.getRecipes().subscribe((data) => {
      this.recipesArr = data;
      // this.updateFavorites()
    });
  }

  unlikeRecipe(ID: string) {
    // console.log(this.recipesArr);

    // this.recipesArr.forEach((rcp)=>{
    //   if(rcp.recipe_id == ID){
    //     let index = this.recipesArr.indexOf(rcp)
    //     this.recipesArr.splice(index,1)
    //   }
    // })

    // console.log(this.recipesArr);
    
    this.apiService.addLikedRecipe(ID);
    this.getRecipes();

  }


  checkIfThisRecipeIsLiked(ID: string): boolean {
    return this.apiService.checkIfThisRecipeIsLiked(ID);
  }

  openOffCanvas(recipe: Recipe) {
    this.offCanvas.open(RecipeDetailsComponent, {
      animation: true,
      backdrop: true,
      keyboard: true,
      scroll: true,
      position: 'end',
    });
    this.apiService.setOffCanvasRecipe(recipe);
  }

  sort(order: any) {
    this.setOrder = order;
    console.log(this.setOrder);
  }

  getSort(): string {
    if (this.setOrder == '') return 'All';
    else return this.setOrder;
  }
}
