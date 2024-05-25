import { Component, inject } from '@angular/core';
import { SpoonacularService } from '../spoonacular.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class Home {

  private authService= inject(AuthService)
  private _router = inject(Router)

  ngOnInit(){
    this.getDaily();
    this.getPopularRecipes();
  }

  constructor(private spoonacularService: SpoonacularService) {}

  query: string = '';
  recommendedRecipe: any = {};
  recipeCard: any = {};
  suggestions: any[] = [];
  popularRecipes: any[] = [];

  getPopularRecipes(){
    this.spoonacularService.getPopularRecipes().subscribe(
      (data) => {
        this.popularRecipes = data.recipes;
      },
      (error) => {
        console.log("Error fetching popular recipes", error);
      }
    );
  }

  getDaily(){
    this.spoonacularService.getDaily().subscribe(
      (data) => {
        this.recommendedRecipe = data.recipes[0];
        this.getRecipeCard(this.recommendedRecipe.id);
      },
      (error) => {
        console.log("No se ha podido recuperar correctamente la informacion", error);
      }
    );
  }

  getRecipeCard(id: string){
    this.spoonacularService.getRecipeCard(id).subscribe(
      (data) => {
        this.recipeCard = data;
      },
      (error) => {
        console.log("Error fetching recipe card:", error);
      }
    );
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

  navigateToSearch(query: string) {
    this.query = '';
    this.suggestions = [];
    this._router.navigate(['/tabs/tab2'], { queryParams: { query: query } });
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
