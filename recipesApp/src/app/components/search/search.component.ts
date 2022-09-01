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

  recipesArr: Recipe[] = [];

  constructor(private apiServie: ApiService) {}

  ngOnInit(): void {
    this.apiServie.getAllTags().subscribe((tagsData) => {
      this.tags = tagsData;
    });

    this.apiServie.getRecipes().subscribe((tagsData) => {
      this.recipesArr = tagsData;
    });
  }
}
