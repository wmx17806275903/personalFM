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
  constructor(public httpDomain:HttpDomainService) { }

  ngOnInit(): void {
    var api_home="/home"
    this.httpDomain.get(api_home).then((response)=>{
      this.home=response;
    })
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
  }

}
