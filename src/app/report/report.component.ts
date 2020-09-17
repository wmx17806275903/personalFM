import { Component, OnInit } from '@angular/core';
import {HttpDomainService} from "../services/http-domain.service";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  public home;
  public option;
  expenseDetail: any;
  constructor(public httpDomain:HttpDomainService) { }

  ngOnInit(): void {
    var api_home="/home"
    this.httpDomain.get(api_home).then((response)=>{
      this.home=response;
    })
    var api_expense="expenses/details";
    var xData:any[] = [];
    var yData:any[] = [0];
    var maxDate=0;
    this.httpDomain.get(api_expense).then((response)=>{
      this.expenseDetail=response;
      console.log(this.expenseDetail)
      for(var i=0;i<this.expenseDetail.length;i++){        
        xData.push(this.expenseDetail[i]["categoryName"]);
        yData.push(this.expenseDetail[i]["totalValue"]);
        if(this.expenseDetail[i]['totalValue']>maxDate)maxDate=this.expenseDetail[i]['totalValue']
      }
    })
    var dataAxis =xData;// ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
    var data = yData;//[220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
    var yMax = maxDate;
    var dataShadow = [];

    for (var i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
    }
    this.option = {
      title: {
          text: 'Expenses',
          subtext: 'Personal Finance Manager: Expenses Manager'
      },
      xAxis: {
          data: dataAxis,
          axisLabel: {
              inside: true,
              textStyle: {
                  color: '#fff'
              }
          },
          axisTick: {
              show: false
          },
          axisLine: {
              show: false
          },
          z: 10
      },
      yAxis: {
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          axisLabel: {
              textStyle: {
                  color: '#999'
              }
          }
      },
      dataZoom: [
          {
              type: 'inside'
          }
      ],
      series: [
          { // For shadow
              type: 'bar',
              itemStyle: {
                  color: 'rgba(0,100,0,0.05)'
              },
              barGap: '-100%',
              barCategoryGap: '40%',
              data: dataShadow,
              animation: false
          },
          {
              type: 'bar',
              itemStyle: {
                  color: {offset: 1, color: '#18Cdf0'}
              },
              emphasis: {
                  itemStyle: {
                      color: {offset: 0, color: '#2378f7'},                     
                  }
              },
              data: data
          }
      ]
    };

  }
}
