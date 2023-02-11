import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details.component';
import { SubDetailsComponent } from './sub-details/sub-details.component';

const routes: Routes = [
  { path: '', component: DetailsComponent , pathMatch: 'full'},
  { path: ':id', component: SubDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsRoutingModule { }
