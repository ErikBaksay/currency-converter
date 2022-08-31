import { ChartDataService } from './../../services/chart-data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Subject } from 'rxjs';
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
  chartLabels:any = []
  selectedCurrencies = ['AED','AFN']
  fromCurrency = this.selectedCurrencies[0]
  toCurrency = this.selectedCurrencies[1]
  
  chart : Chart|null = null
  labels : string[] = []
  data : number[] = []

  constructor(private chartDataService : ChartDataService) {
    this.selectedCurrencies = chartDataService.getSelectedCurrencies()
    this.chartDataService.fromCurrencyChange.subscribe((newFrom) => {
      this.fromCurrency = newFrom
      this.constructChart()
    })
    this.chartDataService.toCurrencyChange.subscribe((newTo) => {
      this.fromCurrency = newTo
      this.constructChart()
    })
   }

  ngOnInit(): void {    
    this.constructChart()
  }

  constructChart(){
    this.chartLabels = []
    this.chartData = []
    
    this.chartDataService.getChartData(this.monthAgoDate,this.currentDate)
    .subscribe(response=>{
    this.chartData = response;
    
    let selectedCurrencies = this.chartDataService.getSelectedCurrencies()
    this.fromCurrency = selectedCurrencies[0]
    this.toCurrency = selectedCurrencies[1]
    
    this.chartData = this.chartData['rates'];
    let i = 0
    let tempData = []
    this.chartLabels = []
        for (let key in this.chartData){
          
          this.chartLabels.push(key.slice(5,key.length))
          let number = this.chartData[key][this.toCurrency]
          tempData.push(number)
        }
      this.chartData = tempData

      this.labels = this.chartLabels
      this.data = this.chartData

      if (this.chart == null){
        this.createChart()
      }else{
        this.chart.data.datasets[0].data = this.data
        this.chart.data.labels = this.labels
        this.chart.update()
      }
    })
  }

  up = (ctx : any, value : any) => ctx.p0.parsed.y < ctx.p1.parsed.y ? value : undefined;
  down = (ctx : any, value : any) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;

  createChart(){
    Chart.defaults.color = "#333";
    this.chart = new Chart('chart', {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
            data: this.data,
            tension: 0.2,
            segment: {
              borderColor: ctx => this.up(ctx,'rgba(75,192,192,1)') || this.down(ctx,'rgba(255,26,104,1)'),
            }
        }]
      },
      options:{
        plugins:{
          legend:{
            display:false
          },
          tooltip:{
            enabled: true
          }
        },
        elements:{
          point:{
            radius:1,
            backgroundColor: 'transparent',
            borderColor: 'lightGray'
          }
        },
      },
      
    });
  }
  
}
