import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpoonacularService {

  constructor(private httpClient: HttpClient) { }

  searchRecipes(query: string): Observable<any>{
    return this.httpClient.get(`https://api.spoonacular.com/recipes/search?query=${query}&apiKey=4c0eef87036b4f9ab5429554ec90f87c`);
  }

  getDaily(): Observable<any>{
    return this.httpClient.get(`https://api.spoonacular.com/recipes/random?number=150&apiKey=4c0eef87036b4f9ab5429554ec90f87c`);
  }
}
