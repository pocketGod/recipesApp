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
  addNewRecipe(recipe:Recipe):Observable<Recipe>{
    return this.http.post(this.baseURL + `recipes`, recipe,{ headers: { responseType: 'text', Authorization: this.getSessionData('token') }}) as unknown as Observable<Recipe>
  }


  //not checked yet
  getRandomRecipe(tag:string):Recipe{
    let randomRecipe = this.allRecipes[Math.round(Math.random()*(this.allRecipes.length))]
    if (randomRecipe.tags.includes(tag)) return randomRecipe
    else return this.getRandomRecipe(tag)
  }





  constructor(private http:HttpClient) {

    //login test
    // this.login({email:'aviv@gmail.com', password:'123456'}).subscribe((data:string)=>{
    //   console.log(data);
    //   this.setSessionData('token', data)
    // })


    //register test
    // שחף אם אתה מריץ את הטסט הבא אז תמלא פרטים אחרים של יוזר שלא קיים
    // this.register({email:'test@gmail.com', password:'123456', name:'test', admin:false}).subscribe((data:string)=>{
    // console.log(data);
    // this.setSessionData('token', data)
    // })


      //new recipe test
  //     this.addNewRecipe(JSON.parse(`{
  //       "title": "pizza22",
  //       "category": "italian",
  //       "description": "who doesnt know what a pizza is?",
  //       "tags": ["yummy", "with friends", "easy to make"],
  //       "ingredients": [{
  //           "name": "motzarella",
  //           "mandatory": false,
  //           "mainIngredient": false,
  //           "amount": "150g",
  //           "similar": ["burekas pizza", "kaltzone"],
  //           "pic": "url to the desired picture"
  //       },
  //       {
  //           "name": "white flour",
  //           "mandatory": false,
  //           "mainIngredient": false,
  //           "amount": "300g",
  //           "similar": ["full wheat flour", "hummos flour"],
  //           "pic": "url to the desired picture"
  //       }],
  //       "img": "url to the desired picture",
  //       "mainTaste": ["sweet", "salty"],
  //       "rating": 8.8,
  //       "cookTime": "45m"
  //   }`)
  // ).subscribe((data:Recipe)=>{
  //   console.log(data)
  // })

  }

}
