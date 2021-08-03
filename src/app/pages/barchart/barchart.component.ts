import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit {
 
  labelArr = Array();
  dataArr = Array();
  barChartLabels: string[] = [];
  chartColors: string[];
  barChartData: any[] =[];
  public barChartType: ChartType = 'bar';

  public CommitterObjArr:string[];
  chartReady = false;

  constructor() {
    let CommitterArrList=  localStorage.getItem("FrequencyObj");
    this.getCommitterObjectArr(CommitterArrList);
    this._setChart();
  }
  ngOnInit() {
       
  }
  private _setChart() {
    this.barChartLabels = this.labelArr;
    let dataObj = [{
      label: "No of commits",
      data: this.dataArr
    }]
    this.barChartData = dataObj;

    this.chartReady = true;
  }

  getCommitterObjectArr(CommitterMapList:any){
    this.CommitterObjArr = JSON.parse(CommitterMapList);
    for (let property in this.CommitterObjArr){
      this.labelArr.push(property);
      this.dataArr.push(this.CommitterObjArr[property]);
    }     
  }
   
 
  
}
