import { Component } from '@angular/core';
import { FavServiceService } from '../fav-service.service';
import { SpoonacularService } from '../spoonacular.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private dbService: FavServiceService, private Spoonacular: SpoonacularService) {
    this.dbService.favoritesChanged.subscribe(() => {
      this.convertFavs();
    });
  }

  favs: any[] = [];

  recipes: any[] = [];

  ngOnInit(){this.convertFavs()}

  async convertFavs(){
    this.favs = [];
    (await this.dbService.getFavorites()).forEach((doc) => {
      this.favs.push(doc.data());
    });
    this.recipes = [];
    this.favs.map((recipe: any) => {
      this.Spoonacular.getSingleRecipe(recipe.RecipeID).subscribe(
        (data) => {
          this.recipes.push(data);
        },
        (error) => {
          console.log(error);
        }
      )
    })
  }

}
