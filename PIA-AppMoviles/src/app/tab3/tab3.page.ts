import { Component } from '@angular/core';
import { FavServiceService } from '../fav-service.service';
import { SpoonacularService } from '../spoonacular.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private dbService: FavServiceService, 
    private Spoonacular: SpoonacularService,
    private authService: AuthService,
    private _router: Router) {
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

  async logOut(){
    try {
      await this.authService.logOut();
      this._router.navigateByUrl('/');
    } catch (error) {
      console.log(error)
    }
  }

}
