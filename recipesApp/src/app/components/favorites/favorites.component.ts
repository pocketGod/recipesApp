import { Component, Input, OnInit } from '@angular/core';
import { string } from 'joi';
import { Recipe } from 'src/app/interfaces/Recipe';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  tags: string[] = [];
  recipesArr: Recipe[] = [];
  allIngredients: string[] = [];

  @Input() tagFilters: { [key: string]: boolean } = {};

  constructor(private apiServie: ApiService) {}

  ngOnInit(): void {}
}
