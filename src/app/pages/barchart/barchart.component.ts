import { Component, OnInit } from '@angular/core';
import { BarChartService } from 'app/services/barchart.service';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barCharTest:any=0;

  public barChartData2: any[] = [];
  
  flag:boolean = true;

  constructor(private barChartService: BarChartService) {
      
    let newMemberStat = this.getCurrentYearData();
   }

  ngOnInit() {
  }
  getCurrentYearData(){
   debugger;
    let year = (new Date()).getFullYear();

    this.barChartService.getTotalNewMembersVisitorPerMonth(year.toString()).subscribe(    
      data => {        
          if (data)   
          {   
            this.barChartData2 = data;
            let result =JSON.stringify(data);
            console.log( " chart server result:"+result);         
          }                                      
      },    
      error => {    
         console.log("Chart server result: "+error);
      }); 
      console.log('value: '+this.barChartData2);
      return this.barChartData2 ;
  }  
  //last year
  getYearToDateData():void {   
    let year = (new Date()).getFullYear();
    let lastYear = year-1;    

    let clone = this.barChartData2;
    let LastyearBarcharData:any[]=[];

    this.barChartService.getTotalNewMembersVisitorPerMonth(lastYear.toString()).subscribe(    
      data => {        
          if (data)   
          {   
            LastyearBarcharData = data;         
            console.log( "Last year this.barChartData2:  "+LastyearBarcharData);            
            this.barChartData2 = LastyearBarcharData;  
            let result =JSON.stringify(data);
            console.log( "Last year chart server result:  "+result);        
           }                                      
      },    
      error => {    
         console.log("NewBarcharData Chart server result: "+error);
      }); 
    //clone[0].data = newBarcharData;
    //this.barChartData2 = clone; 
  }
  YearToDate(){    
    this.getYearToDateData();           
  }
  
}
