import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessLevelsComponent } from './access-levels/access-levels.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', component: AccessLevelsComponent },
  ]),
],
exports: [RouterModule]
})
export class AppRoutingModule { }


