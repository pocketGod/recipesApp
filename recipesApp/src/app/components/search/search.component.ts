import { Component, Input, OnInit, ViewChildren } from '@angular/core';
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

  @Input() tagFilters: { [key: string]: boolean } = {};
  filteredByTagRecipes: Recipe[] = [];

  constructor(private apiServie: ApiService) {}

  ngOnInit(): void {
    if (localStorage.getItem('likesArr') == null) {
      localStorage.setItem('likesArr', '[]');
    }

    this.apiServie.getAllTags().subscribe((tagsData) => {
      for (let i = 0; i < 4; i++) {
        this.tags = tagsData;
        this.tags.forEach((tag) => {
          this.tagFilters[tag] = false;
        });
      }
    });

    this.apiServie.getRecipes().subscribe((tagsData) => {
      this.recipesArr = tagsData;
    });

    this.apiServie.getAllIng().subscribe((ingData) => {
      this.allIngredients = ingData;
    });
  }

  likeRecipe(ID: string) {
    this.apiServie.addLikedRecipe(ID);
  }

  checkIfThisRecipeIsLiked(ID: string): boolean {
    return this.apiServie.checkIfThisRecipeIsLiked(ID);
  }

  onTagCheckboxChange(e: any) {
    let x = this.tagFilters[e.srcElement.value as string];
    x = x ? false : true;
    // console.log(x)
    // console.log(this.tagFilters)
    return x;
  }

  getSelectedTags(): string[] {
    let tagArr: string[] = [];
    let keys = Object.keys(this.tagFilters);
    let vals = Object.values(this.tagFilters);
    for (let i = 0; i < keys.length; i++) {
      if (vals[i]) {
        tagArr.push(keys[i]);
      }
    }
    return tagArr;
  }
}
