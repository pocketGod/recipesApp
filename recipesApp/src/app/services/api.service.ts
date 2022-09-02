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


  // Recipe Http Methods
  getRecipes():Observable<Recipe[]> {
    return this.http.get(this.baseURL + 'recipes') as Observable<Recipe[]>
  }
  getRecipeByID(recipe_id:string):Observable<Recipe> {
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
  editRecipeData(recipe:Recipe, ID:string):Observable<Recipe> {
    return this.http.put(this.baseURL + `recipes/${ID}`, recipe, { headers: { responseType: 'text', Authorization: this.getSessionData('token') }}) as Observable<Recipe>
  }
  deleteRecipe(ID:string):Observable<string>{
    return this.http.delete(this.baseURL + `recipes/${ID}`, { headers: { responseType: 'text', Authorization: this.getSessionData('token') }}) as Observable<string>
  }


  addLikedRecipe(ID:string){
    let likesArr: string[] = JSON.parse(this.getLocalStorageData('likesArr'))
    if (likesArr.includes(ID)) {
      let index = likesArr.indexOf(ID)
      likesArr.splice(index, 1)
    }
    else{
      likesArr.push(ID)
    }
    this.setLocalStorageData('likesArr', JSON.stringify(likesArr))
  }
  getLikedRecipeArr(){
    let likesArr: string[] = JSON.parse(this.getLocalStorageData('likesArr'))
    return likesArr
  }
  checkIfThisRecipeIsLiked(ID:string):boolean{
    let likesArr: string[] = JSON.parse(this.getLocalStorageData('likesArr'))
    return likesArr.includes(ID)
  }

  

  
  // session and local Storage Methods
  getSessionData(key:string):string{
    return sessionStorage.getItem(key) as string
  }
  setSessionData(key:string, val:string):void{
    sessionStorage.setItem(key, val)
  }
  getLocalStorageData(key:string):string{
    return localStorage.getItem(key) as string
  }
  setLocalStorageData(key:string, val:string):void{
    localStorage.setItem(key, val)
  }


  // User Http Methods
  register(user: User):Observable<string>{
    return this.http.post(this.baseURL + `register`, user, {responseType: 'text'}) as Observable<string>
  }
  login(user: User):Observable<string>{
    return this.http.post(this.baseURL + `login`, user, {responseType: 'text'}) as Observable<string>
  }



  constructor(private http:HttpClient) {}

}
