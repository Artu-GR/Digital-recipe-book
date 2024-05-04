import { Component } from '@angular/core';
import { SpoonacularService } from '../spoonacular.service';

@Component({
  selector: 'app-Home',
  templateUrl: 'Home.page.html',
  styleUrls: ['Home.page.scss']
})
export class Home {

  ngOnInit(){
    this.getDaily();
  }

  constructor(private spoonacularService: SpoonacularService) {}

  dailyRecipe: any = {};

  fullCatalog: any[] = [];

  getDaily(){
    this.spoonacularService.getDaily().subscribe(
      (data) => {
        this.fullCatalog = data.recipes.map((recipe: any) => {
          recipe.image = `https://spoonacular.com/recipeImages/${recipe.image}`;
          return recipe;
        });
        this.dailyRecipe = this.fullCatalog[Math.floor((Math.random()*this.fullCatalog.length))];
      },
      (error) => {
        console.log("No se ha podido recuperar correctamente la informacion", error);
      }
    );
  }

}
