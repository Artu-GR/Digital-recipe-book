import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpoonacularService {

  constructor(private httpClient: HttpClient) { }

  apiKey: string = '73bf64a5f64240ea9e7564f169b67705';

  searchRecipes(query: string): Observable<any>{
    return this.httpClient.get(`https://api.spoonacular.com/recipes/search?query=${query}&apiKey=${this.apiKey}`);
  }

  getDaily(): Observable<any>{
    return this.httpClient.get(`https://api.spoonacular.com/recipes/random?number=150&apiKey=${this.apiKey}`);
  }

  getSingleRecipe(id: string): Observable<any>{
    return this.httpClient.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${this.apiKey}`)
  }

  getRecipeIngredients(id: string): Observable<any>{
    return this.httpClient.get(`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${this.apiKey}`)
  }
}
