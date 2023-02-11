import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path:'',redirectTo:'/home',pathMatch:'full'},
  { path:'home',component:HomeComponent,pathMatch:'full'},
   { path: 'form', loadChildren: () => import('./pages/form/form.module').then(m => m.FormModule) },
   { path: 'details', loadChildren: () => import('./pages/details/details.module').then(m => m.DetailsModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
