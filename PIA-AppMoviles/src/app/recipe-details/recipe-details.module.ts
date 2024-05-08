import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeDetailsComponent } from './recipe-details.component';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { RecipeDetailsComponentRoutingModule } from './recipe-details-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RecipeDetailsComponentRoutingModule
  ],
  declarations: [RecipeDetailsComponent]
})
export class RecipeDetailsComponentModule {}
