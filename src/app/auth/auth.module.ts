import { SharedModule } from './../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
