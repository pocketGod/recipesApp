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
  headers = {
    'content-type': 'application/json',
    'Authorization': ''
  }

  allRecipes: Recipe[] = []



  constructor(private http:HttpClient) {


    //login test
    // this.login({email:'aviv@gmail.com', password:'123456'}).subscribe((data:string)=>{
    //   console.log(data);
    // })


  }

  // sessionStorage Methods

  getSessionData(key:string):string{
    return sessionStorage.getItem(key) as string
  }

  setSessionData(key:string, val:string):void{
    sessionStorage.setItem(key, val)
  }

  updateHeaderAuth(){
    // let token:string = this.getSessionData('token')
    // if (!token) token = ''
    // this.headers = {
    //   // 'content-type': 'application/json',
    //   'Authorization': token
    // }
  }


  // User Http Methods

  register(user: User):Observable<string>{
    return this.http.post(this.baseURL + `register`, user, {responseType: 'text'}) as Observable<string>
  }

  login(user: User):Observable<string>{
    return this.http.post(this.baseURL + `login`, user, {responseType: 'text'}) as Observable<string>
  }



  // Recipe Http Methods

  getRecipes(): Observable<Recipe[]> {
    return this.http.get(this.baseURL + 'recipes') as Observable<Recipe[]>
  }

  getRecipeByID(recipe_id:number): Observable<Recipe> {
    return this.http.get(this.baseURL + `recipes/${recipe_id}`) as Observable<Recipe>
  }


  //not checked yet
  addNewRecipe(recipe:Recipe):Observable<Recipe>{
    return this.http.post(this.baseURL + `recipes`, JSON.stringify(recipe), {headers:this.headers}) as Observable<Recipe>
  }


}
