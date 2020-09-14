import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeBudgetComponent } from './home-budget/home-budget.component';
import {NgxEchartsModule} from 'ngx-echarts';
// import * as echarts from "echarts";
@NgModule({
  declarations: [
    AppComponent,
    HomeBudgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxEchartsModule.forRoot({echarts:()=>import("echarts"),
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
