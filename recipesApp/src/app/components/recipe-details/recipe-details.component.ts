import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/interfaces/Recipe';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  offCanvasRecipe!: Recipe

  constructor(private apiS:ApiService) { }

  ngOnInit(): void {
    this.offCanvasRecipe = this.apiS.getOffCanvasRecipe()
  }

}
