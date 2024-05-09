import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard, publicGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [authGuard],
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule),
    canActivate: [publicGuard],
  },
  {
    path: '',
    redirectTo: 'sign-up',
    pathMatch: 'full'
  },
  {
    path: 'log-in',
    loadChildren: () => import('./log-in/log-in.module').then( m => m.LogInPageModule),
    canActivate: [publicGuard],
  },
  {
    path: 'recipe-details/:id',
    loadChildren: () => import('./recipe-details/recipe-details.module').then( m => m.RecipeDetailsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
