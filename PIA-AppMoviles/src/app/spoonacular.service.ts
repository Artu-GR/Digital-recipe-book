import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpoonacularService {

  constructor(private httpClient: HttpClient) { }

  //apiKey: string = '73bf64a5f64240ea9e7564f169b67705';
  //apiKey: string = '28e40e19999d48c7ad570f84cc2987ff';
  //apiKey: string = '75a888f6bda74747bcce5dd958d762b5';
  //apiKey: string = '3880af13ea794cf19e0c6c9f69d45af4';
  //apiKey: string = 'ff39dbe9c4094b6fbb209398b4e908b2';
  //apiKey: string = '3815a1984c9f43fd9a6a52fdb4fbf2a0';
  apiKey: string = '593e4ce868d04326ad4873d872e3ebfb';

  searchRecipes(query: string): Observable<any>{
    return this.httpClient.get(`https://api.spoonacular.com/recipes/search?query=${query}&apiKey=${this.apiKey}`);
  }

  getDaily(): Observable<any>{
    return this.httpClient.get(`https://api.spoonacular.com/recipes/random?number=1&apiKey=${this.apiKey}`);
  }

  getSingleRecipe(id: string): Observable<any>{
    return this.httpClient.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${this.apiKey}`)
  }

  getRecipeIngredients(id: string): Observable<any>{
    return this.httpClient.get(`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${this.apiKey}`)
  }

  autocompleteRecipeSearch(query: string): Observable<any> {
    return this.httpClient.get(`https://api.spoonacular.com/recipes/autocomplete?query=${query}&number=10&apiKey=${this.apiKey}`);
  }

  getRecipeCard(id: string): Observable<any> {
    return this.httpClient.get(`https://api.spoonacular.com/recipes/${id}/card?apiKey=${this.apiKey}`);
  }

  getPopularRecipes(): Observable<any> {
    return this.httpClient.get(`https://api.spoonacular.com/recipes/random?number=6&apiKey=${this.apiKey}`);
  }
}
