import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpoonacularService } from '../spoonacular.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
})
export class RecipeDetailsPage implements OnInit {

  constructor(private route: ActivatedRoute, private spoonacularService: SpoonacularService) { }

  ngOnInit() {
    this.getIngredients(this.recipeId);
  }

  ingredients: any[] = [];

  recipeId: string = this.route.snapshot.params['id'];

  recipe: any = this.spoonacularService.getSingleRecipe(this.recipeId).subscribe(
    (data) => {
      this.recipe = data;
      this.recipe.summary = this.stripHtmlTags(this.recipe.summary);
    },
    (error) => {
      console.log(error);
    }
  );

  getIngredients(id: string){
    this.spoonacularService.getRecipeIngredients(id).subscribe(
      (data) => {
        this.ingredients = data.ingredients.map((ingredient: any) => ingredient.name);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  stripHtmlTags(label: string){
    return label.replace(/<[^>]*>/g, '');
  }

}
