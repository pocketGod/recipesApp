import { Component, Input, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { json } from 'express';
import { string } from 'joi';
import { Recipe } from 'src/app/interfaces/Recipe';
import { ApiService } from 'src/app/services/api.service';

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
  favoriteRecipeArr: Recipe[] = []

  @Input() tagFilters: { [key: string]: boolean } = {};

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getRecipes()
  }

  getRecipes(){
    this.apiService.getRecipes().subscribe((data)=>{
      this.recipesArr = data
      // this.updateFavorites()
    })
  }

  unlikeRecipe(ID: string) {
    this.getRecipes()
    this.apiService.addLikedRecipe(ID);
  }

  checkIfThisRecipeIsLiked(ID: string): boolean {
    return this.apiService.checkIfThisRecipeIsLiked(ID);
  }
}
