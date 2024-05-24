import { Component, ElementRef, ViewChild } from '@angular/core';
import { SpoonacularService } from '../spoonacular.service';
import { Observable } from 'rxjs';
import { FavServiceService } from '../fav-service.service';
import { getDocs } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private spoonacularService: SpoonacularService, 
    private dbService: FavServiceService,
  private authService: AuthService,
  private _router: Router,) {}

  ngOnInit(){
    this.convertFavs();
  }

  query: string = '';

  recipes: any[] = [];

  favs: any[] = [];

  favIds: any[] = [];

  suggestions: any[] = [];

  getRecipes(){
    console.log("im here");
    if(this.query.trim() !== ''){
      this.spoonacularService.searchRecipes(this.query).subscribe(
        (data) =>{
          this.recipes = data.results.map((recipe: any) => {
            recipe.image = `https://spoonacular.com/recipeImages/${recipe.image}`;
            return recipe;
          });
          this.suggestions = [];
        },
        (error) => {
          console.log("No se ha podido recuperar correctamente la informacion", error);
        }
      );
    }
    else{
      this.recipes = [];
    }
  }

  autocompleteSearch() {
    if (this.query.trim() !== '') {
      this.spoonacularService.autocompleteRecipeSearch(this.query).subscribe(
        (data) => {
          this.suggestions = data;
        },
        (error) => {
          console.log("No se ha podido recuperar correctamente la informacion", error);
        }
      );
    } else {
      this.suggestions = [];
    }
  }

  selectSuggestion(suggestion: any) {
    this.query = suggestion.title;
    this.suggestions = [];
    this.getRecipes();
  }

  addFav(recipe: any, event: Event){
    event.preventDefault();
    event.stopPropagation();
    this.dbService.addFavorite(recipe);
    this.convertFavs();
  }

  delFav(recipe: any, event: Event){
    event.preventDefault();
    event.stopPropagation();
    this.dbService.deleteFavorite(recipe);
    this.convertFavs();
  }
  
  async convertFavs(){    
    this.favs = [];
    (await this.dbService.getFavorites()).forEach((doc) => {
      this.favs.push(doc.data());
    });
    this.favIds = [];
    this.favs.map((recipe: any) => {
      recipe = recipe.RecipeID;
      this.favIds.push(recipe);
    })
  }

  async logOut(){
    try {
      await this.authService.logOut();
      this._router.navigateByUrl('/');
    } catch (error) {
      console.log(error)
    }
  }

}
