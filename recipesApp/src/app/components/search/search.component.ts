import { Component, OnInit } from '@angular/core';
import { string } from 'joi';
import { Recipe } from 'src/app/interfaces/Recipe';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  userName: string = 'UserName';
  recipesCounter: number = 99;
  tags: String[] = [];
  recipeName: string = '';
  recipeTag: string = '';
  ingredients: string = '';
  showMoreTags: boolean = false;

  recipesArr: Recipe[] = [];

  constructor(private apiServie: ApiService) {}

  ngOnInit(): void {
    if (localStorage.getItem('likesArr')==null) {
      localStorage.setItem('likesArr', '[]')
    }

    this.apiServie.getAllTags().subscribe((tagsData) => {
      for (let i = 0; i < 4; i++) {
        this.tags = tagsData;
      }
    });

    this.apiServie.getRecipes().subscribe((tagsData) => {
      this.recipesArr = tagsData;
    });
  }

  likeRecipe(ID:string){
    this.apiServie.addLikedRecipe(ID)
  }

  checkIfThisRecipeIsLiked(ID:string):boolean{
    return this.apiServie.checkIfThisRecipeIsLiked(ID)
  }
}
