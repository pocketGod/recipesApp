import { Component, OnInit } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Recipe } from 'src/app/interfaces/Recipe';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  offCanvasRecipe!: Recipe

  constructor(private apiS:ApiService, private offcanvas:NgbOffcanvas) { }

  ngOnInit(): void {
    this.offCanvasRecipe = this.apiS.getOffCanvasRecipe()
  }

  closeCanvas(){
    this.offcanvas.dismiss()
  }

}
