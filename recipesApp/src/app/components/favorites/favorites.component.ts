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
  recipesArr: Recipe[] = [];
  allIngredients: string[] = [];
  favoritesId: string[] = [];

  @Input() tagFilters: { [key: string]: boolean } = {};

  constructor(private apiServie: ApiService) {}

  ngOnInit(): void {
    this.checkFvorites();
  }

  checkFvorites() {
    if (!localStorage.getItem('likesArr')) {
      localStorage.setItem('likesArr', '[]');
    }

    this.favoritesId = JSON.parse(
      this.apiServie.getLocalStorageData('likesArr')
    );

    this.favoritesId.forEach((id) => {
      this.apiServie.getRecipeByID(id).subscribe((data: Recipe) => {
        this.recipesArr.push(data);
      });
    });
  }

  likeRecipe(ID: string) {
    this.apiServie.addLikedRecipe(ID);
  }

  checkIfThisRecipeIsLiked(ID: string): boolean {
    this.checkFvorites();
    return this.apiServie.checkIfThisRecipeIsLiked(ID);
  }
}
