import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab4Component } from './tab4.component';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab4ComponentRoutingModule } from './tab4-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab4ComponentRoutingModule
  ],
  declarations: [Tab4Component]
})
export class Tab4ComponentModule {}
