import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { AuthComponent } from './auth.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: '**', redirectTo: '/recipes' } //WildCard
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
