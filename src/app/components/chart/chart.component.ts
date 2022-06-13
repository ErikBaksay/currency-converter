import { ChartDataService } from './../../services/chart-data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.sass']
})
export class ChartComponent implements OnInit {

  today = new Date()
  currentDate = [this.today.getFullYear(),this.today.getMonth(),this.today.getDate()]
  monthAgoDate = [this.today.getFullYear(),this.today.getMonth()-1,this.today.getDate()]
  chartData:any;

  constructor(private chartDataService : ChartDataService) { }

  ngOnInit(): void {    

    let chart = new Chart('chart', {
      type: 'line',
      data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
              data: [12, 19, 3, 5, 2, 3],
          }]
      },
  });

  this.chartDataService.getChartData(this.monthAgoDate,this.currentDate)
    .subscribe(response=>{
    this.chartData = response;
    this.chartData = this.chartData['rates'];
    console.log(this.chartData);
    
  })
  }

}
