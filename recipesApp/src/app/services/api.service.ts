import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Recipe } from '../interfaces/Recipe'
import { User } from '../interfaces/User'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  baseURL : string = 'http://localhost:8000/api/'

  allRecipes: Recipe[] = []


  // sessionStorage Methods
  getSessionData(key:string):string{
    return sessionStorage.getItem(key) as string
  }
  setSessionData(key:string, val:string):void{
    sessionStorage.setItem(key, val)
  }


  // User Http Methods
  register(user: User):Observable<string>{
    return this.http.post(this.baseURL + `register`, user, {responseType: 'text'}) as Observable<string>
  }
  login(user: User):Observable<string>{
    return this.http.post(this.baseURL + `login`, user, {responseType: 'text'}) as Observable<string>
  }


  // Recipe Http Methods
  getRecipes():Observable<Recipe[]> {
    return this.http.get(this.baseURL + 'recipes') as Observable<Recipe[]>
  }
  getRecipeByID(recipe_id:number):Observable<Recipe> {
    return this.http.get(this.baseURL + `recipes/${recipe_id}`) as Observable<Recipe>
  }
  getRecipesByTag(tag:string):Observable<Recipe[]>{
    return this.http.get(this.baseURL + `recipes/tags/${tag}`) as Observable<Recipe[]>
  }
  getRandomRecipe(tag:string):Observable<Recipe>{
    return this.http.get(this.baseURL + `recipes/random/${tag}`) as Observable<Recipe>
  }
  getRecipesByMainIng(ing:string):Observable<Recipe[]>{
    return this.http.get(this.baseURL + `recipes/main/${ing}`) as Observable<Recipe[]>
  }
  getAllTags():Observable<string[]>{
    return this.http.get(this.baseURL + `recipes/alltags`) as Observable<string[]>
  }



  addNewRecipe(recipe:Recipe):Observable<Recipe>{
    return this.http.post(this.baseURL + `recipes`, recipe,{ headers: { responseType: 'text', Authorization: this.getSessionData('token') }}) as unknown as Observable<Recipe>
  }
  editRecipeData(recipe:Recipe, ID:number):Observable<Recipe> {
    return this.http.put(this.baseURL + `recipes/${ID}`, recipe, { headers: { responseType: 'text', Authorization: this.getSessionData('token') }}) as Observable<Recipe>
  }
  deleteRecipe(ID:number):Observable<string>{
    return this.http.delete(this.baseURL + `recipes/${ID}`, { headers: { responseType: 'text', Authorization: this.getSessionData('token') }}) as Observable<string>
  }


  // addLikedRecipe(ID:number):Observable<string[]>{
  //   this.http.post(this.baseURL + `recipes/likes/${ID}`, ID,{ headers: { responseType: 'text', Authorization: this.getSessionData('token') }}) Observable<string[]>
  // }

 





  constructor(private http:HttpClient) {}

}
