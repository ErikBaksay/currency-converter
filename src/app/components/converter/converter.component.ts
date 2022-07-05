import { ChartDataService } from './../../services/chart-data.service';
import { ExchangeRatesService } from './../../services/exchange-rates.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.sass']
})
export class ConverterComponent implements OnInit {
  currenciesResponse:any;
  currencies : any[][] = []
  conversionValue:any;
  amount = 1
  fromCurrency = 0
  toCurrency = 1

  constructor(private exchangesService:ExchangeRatesService,
              private chartDataService : ChartDataService){}

  convert(){
    if (this.amount == null){
      this.amount = 0
    } 

    let from = this.currencies[this.fromCurrency][0]
    let to = this.currencies[this.toCurrency][0]
    if (this.fromCurrency != this.toCurrency){
      if (this.amount !== 0){
        this.exchangesService.getConverted(from,to,this.amount)
        .subscribe(response => {
          this.conversionValue = response;
          this.conversionValue = this.conversionValue['result']
          this.conversionValue = (Math.round(this.conversionValue * 100) / 100).toFixed(2);
        })
      } else {
        this.conversionValue = 0;
      }
    } else {
      this.conversionValue = this.amount;
    }
    this.chartDataService.currencySelectionChanged(from,to)
  }
  
  switchCurrencies(){
    [this.fromCurrency, this.toCurrency] = [this.toCurrency, this.fromCurrency]
    this.convert()
  }
  
  ngOnInit(): void {
    this.exchangesService.getCurrencies()
      .subscribe(response => {
        this.currenciesResponse = response;
        this.currenciesResponse = this.currenciesResponse.symbols
        let i = 0
        for (let key in this.currenciesResponse){
          let currency = this.currenciesResponse[key].code;
          this.currencies.push([currency,i])
          i++
        }
        this.convert() 
      })
  }
}
