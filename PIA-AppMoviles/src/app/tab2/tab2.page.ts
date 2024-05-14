import { Component } from '@angular/core';
import { SpoonacularService } from '../spoonacular.service';
import { Observable } from 'rxjs';
import { FavServiceService } from '../fav-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private spoonacularService: SpoonacularService, private dbService: FavServiceService) {}

  query: string = '';

  recipes: any[] = [];

  favs: any[] = this.dbService.favorites;

  getRecipes(){
    if(this.query.trim() !== ''){
      this.spoonacularService.searchRecipes(this.query).subscribe(
        (data) =>{
          this.recipes = data.results.map((recipe: any) => {
            recipe.image = `https://spoonacular.com/recipeImages/${recipe.image}`;
            return recipe;
          });
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

  addFav(recipe: any){
    this.dbService.addFavorite(recipe.toString);
  }
  delFav(recipe: any){
    this.dbService.deleteFavorite(recipe.toString)
    //this.favs.splice(this.favs.indexOf(recipe), 1);
  }
}
