import { Component, OnInit, ViewChildren } from '@angular/core';
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
  tags: string[] = [];
  recipeName: string = '';
  allIngredients: string[] = [];
  showMoreTags: boolean = false;

  recipesArr: Recipe[] = [];

  tagFilters: { [key: string]: boolean } = {}

  constructor(private apiServie: ApiService) {}

  ngOnInit(): void {
    if (localStorage.getItem('likesArr')==null) {
      localStorage.setItem('likesArr', '[]')
    }

    this.apiServie.getAllTags().subscribe((tagsData) => {
      for (let i = 0; i < 4; i++) {
        this.tags = tagsData
        this.tags.forEach((tag)=>{
          this.tagFilters[tag] = false
        })
      }
    });

    this.apiServie.getRecipes().subscribe((tagsData) => {
      this.recipesArr = tagsData;
    });

    this.apiServie.getAllIng().subscribe((ingData)=>{
      this.allIngredients = ingData
    })
  }

  likeRecipe(ID:string){
    this.apiServie.addLikedRecipe(ID)
  }

  checkIfThisRecipeIsLiked(ID:string):boolean{
    return this.apiServie.checkIfThisRecipeIsLiked(ID)
  }

  onTagCheckboxChange(val:string){
    this.tagFilters[val] = !this.tagFilters[val]
  }

  // onTagCheck(val:string){
  //   this.recipesArr.forEach((rcp)=>{
  //     rcp.tags.forEach((tag)=>{
  //       if (tag == val){
  //         let index = this.recipesArr.indexOf(rcp)
  //         this.recipesArr.splice(index, 1)
  //       }
  //     })
  //   })
  // }



}
