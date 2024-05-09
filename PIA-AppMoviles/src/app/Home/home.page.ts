import { Component, inject } from '@angular/core';
import { SpoonacularService } from '../spoonacular.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Home',
  templateUrl: 'Home.page.html',
  styleUrls: ['Home.page.scss']
})
export class Home {

  private authService= inject(AuthService)
  private _router = inject(Router)

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

  async logOut(){
    try {
      await this.authService.logOut();
      this._router.navigateByUrl('/');
    } catch (error) {
      console.log(error)
    }
    

  
  }

}
