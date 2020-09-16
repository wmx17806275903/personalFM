import { Component, OnInit } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { DateTimes } from '../utils/date-time';
import {HttpDomainService} from "../services/http-domain.service";

@Component({
  selector: 'app-home-budget',
  templateUrl: './home-budget.component.html',
  styleUrls: ['./home-budget.component.css']
})
export class HomeBudgetComponent implements OnInit {
  public title = "HomeBudget";
  public showBar = true;
  public showCategory=true;
  public showExpenseDetail=false;
  public option;
  public optionPie;
  public budgetUsage;
  public expenseDetail;
  public home:any;
  public clickAdd=false;
  public day : string;
  public xData:any[]=[];
  public yData:any[]=[];
  public categories:object[]=[
    {categroy:"expenses",value:2},
    {categroy:"budget",value:3},
    {categroy:"income",value:4}
  ];
  public details:object[]=[
    {category:"Rent",insideItems:[{category:"Mortage",value:"$1700"}],value:"$1700"},
    {category:"utilitiest",insideItems:[{category:"Electricity",value:"$300"},{category:"Water",value:"$100"}],value:"$211"}
  ];

  constructor(public httpDomain:HttpDomainService){}

  ngOnInit(): void {
    this.day=DateTimes.format(new Date(),'yyyy-MM-dd');

    var api_expense="expenses/details"
    const xy: any[] = [];
    this.httpDomain.get(api_expense).then((response)=>{
      this.expenseDetail=response;
      //console.log(this.expenseDetail)
      for(var i=0;i<this.expenseDetail.length;i++){
        xy.push({ name: this.expenseDetail[i]["categoryName"], value: this.expenseDetail[i]["totalValue"] });
        this.xData.push(this.expenseDetail[i]["categoryName"]);
        this.yData.push(this.expenseDetail[i]["totalValue"]);
      }
      console.log(xy)
    })
    var api_home="/home"
    this.httpDomain.get(api_home).then((response)=>{
      this.home=response;
    })

    this.option = {
      tooltip: {},
      legend: {
        data: ['Expenses']
      },
      xAxis: {
        data: this.xData//["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: this.yData//[5, 20, 36, 10, 10, 20]
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
        data: this.xData//['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
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
          data: xy
        }
      ]
    };
    this.budgetUsage = { 
      series: [
        {
            name: 'Budget',
            type: 'gauge',  
            center:['50%', '40%'],        
            axisLine: {
	            lineStyle: {//仪表盘轴线相关配置。
	                width:5,
	            }
	        },
	        splitLine: {//分隔线样式相关
	            length: 10,//分割线的长度
	            lineStyle: {
	                width:1,
	                color:'#b0b3b8'
	            }
	        },
          data: [{value: 10, name: '%'}],   
	        detail: {//仪表盘详情数据相关
	            textStyle: {
                    color: '#5bdbff',
                    fontSize:16,
                    offsetCenter: [0,'80%']
               }
	        },
	        
	        pointer:{//指针长度与宽度
	            width:3,
	            length:'85%'
	        },
        }
    ]      
    };
  }
  handleVisibleRent(event:Event) {
    event.stopPropagation();
    event.preventDefault();
    if(this.showExpenseDetail) {
      this.showExpenseDetail = false
    }else {
      this.showExpenseDetail = true
    }
  }
  isBar() {    
    this.showBar = true;
  }
  isPie() {
    this.showBar=false; 
  }
  isCategory(){
    this.showCategory=true;
  }
  isDate(){
    this.showCategory=false;
  }
  keyUp(){
    // this.clickAdd=true;
    let newData = {categroy:"expenses",value:2};
    this.categories.push(newData)
  }
  showExpensesDetail(){  
    this.showExpenseDetail=true;  
  }
}
