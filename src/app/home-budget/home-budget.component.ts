import { Component, OnInit } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { HttpClient } from "@angular/common/http";

 

@Component({
  selector: 'app-home-budget',
  templateUrl: './home-budget.component.html',
  styleUrls: ['./home-budget.component.css']
})
export class HomeBudgetComponent implements OnInit {
  title = "HomeBudget";
  showBar = true;
  showExpenseDetail=true;
  public option;
  public optionPie;
  public clickAdd=false;
  public categories:object[]=[
    {categroy:"expenses",value:2},
    {categroy:"budget",value:3},
    {categroy:"income",value:4}
  ];
  public details:object[]=[
    {category:"Rent",value:"$213"},
    {category:"utilitiest",value:"$211"}]

  constructor(private http:HttpClient){}
  public anyList:any

  ngOnInit(): void {
    this.http.get("/assets/demo.json")
   .subscribe(res=>{ this.anyList = res })

    this.option = {
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    };
    this.optionPie = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 10,
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ]
        }
      ]
    };
  }
  handleVisibleRent() {
    if(this.showExpenseDetail) {
      this.showExpenseDetail = false
    }else {
      this.showExpenseDetail = true
    }
  }
  isBar() {    
    this.showBar = true;
  }
  showPie() {
    this.showBar=false; 
  }
  keyUp(){
    // this.clickAdd=true;
    let newData = {categroy:"expenses",value:2};
    this.categories.push(newData)
  }
}
