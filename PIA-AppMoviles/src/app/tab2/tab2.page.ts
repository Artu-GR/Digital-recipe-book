import { Component } from '@angular/core';
import { SpoonacularService } from '../spoonacular.service';
import { Observable } from 'rxjs';
import { FavServiceService } from '../fav-service.service';
import { getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private spoonacularService: SpoonacularService, private dbService: FavServiceService) {}

  ngOnInit(){
    this.convertFavs();
  }

  query: string = '';

  recipes: any[] = [];

  favs: any[] = [];

  favIds: any[] = [];

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
    this.dbService.addFavorite(recipe);
    this.convertFavs();
  }

  delFav(recipe: any){
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
}
