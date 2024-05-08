import { Component } from '@angular/core';
import { SpoonacularService } from '../spoonacular.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private spoonacularService: SpoonacularService) {}

  query: string = '';

  recipes: any[] = [];

  favs: any[] = [];

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

  //FUNCIONES DE PRUEBA, ENLAZAR A BASE DE DATOS
  addFav(recipe: any){
    this.favs.push(recipe);
  }
  delFav(recipe: any){
    this.favs.splice(this.favs.indexOf(recipe), 1);
  }
}
