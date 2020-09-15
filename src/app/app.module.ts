import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeBudgetComponent } from './home-budget/home-budget.component';
import {NgxEchartsModule} from 'ngx-echarts';
import { ReportComponent } from './report/report.component';
import {HttpClientModule} from "@angular/common/http"; //引入HttpClientModule 模块


// import * as echarts from "echarts";
@NgModule({
  declarations: [
    AppComponent,
    HomeBudgetComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxEchartsModule.forRoot({echarts:()=>import("echarts"),
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
