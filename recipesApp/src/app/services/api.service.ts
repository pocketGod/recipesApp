import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Recipe } from '../interfaces/Recipe'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  baseURL : string = 'http://localhost:8000/api/'
  headers = {
    'content-type': 'application/json',
    'Authorization': 'Insert-Token-Here'
  }

  allRecipes ?: Recipe[]


  constructor(private http:HttpClient) {}

  getRecipes(): Observable<Recipe> {
    return this.http.get(this.baseURL + 'recipes') as Observable<Recipe>
  }

  getSpecificRecipe(recipe_id:number): Observable<Recipe> {
    return this.http.get(this.baseURL + `recipes/${recipe_id}`) as Observable<Recipe>
  }

}
