import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeBudgetComponent } from './home-budget/home-budget.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {path:"home",component:HomeBudgetComponent},
  {path:"report",component:ReportComponent},
  {path:"**",redirectTo:"home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
