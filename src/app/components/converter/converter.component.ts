import { CurrencyFull } from './../../interfaces/currency-full';
import { currencyFullNames } from './../../currency-full-names';
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
  currencies : any = []
  conversionValue:any;
  amount = 1
  fromCurrency = 'USD'
  previousFromCurrency = 'USD'
  toCurrency = 'EUR'
  previousToCurrency = 'EUR'
  supportedCurrencies : CurrencyFull[] = []
  supportedCurrenciesCodes : string[] = []
  toCurrencySymbol = ''

  constructor(private exchangesService:ExchangeRatesService,
              private chartDataService : ChartDataService){}

  ngOnInit(): void {
    currencyFullNames.forEach((currency)=>{
      this.supportedCurrencies.push(currency)
      this.supportedCurrenciesCodes.push(currency.code)
    })

    this.exchangesService.getCurrencies()
    .subscribe(response => {
      this.currenciesResponse = response;
      this.currenciesResponse = this.currenciesResponse.symbols
      let i = 0
      for (let key in this.currenciesResponse){
        let currency = this.currenciesResponse[key].code;
        if (this.supportedCurrenciesCodes.includes(currency)){
          let index = this.supportedCurrenciesCodes.indexOf(currency)
          currency = this.supportedCurrencies[i]
          this.currencies.push({currency:currency,id:i})
          i++
        }
      }
      this.convert() 
    })
  }

  convert(){
    if (this.amount == null){
      this.amount = 0
    } 

    console.log(this.supportedCurrencies);
    

    let from = this.fromCurrency
    let to = this.toCurrency

    console.log(from,to);
    
    
    this.toCurrencySymbol = this.supportedCurrencies[this.supportedCurrenciesCodes.indexOf(to)].symbol

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

  emptyCurrencyInput(isFrom : boolean){
    if (isFrom){
      this.previousFromCurrency = this.fromCurrency
      this.fromCurrency = ''
    } else {
      this.previousToCurrency = this.toCurrency
      this.toCurrency = ''
    }
  }
  
  checkIfEmpty(isFrom : boolean){
    if (isFrom){
      if (this.fromCurrency == ''){
        this.fromCurrency = this.previousFromCurrency
      }
    } else {
      if (this.toCurrency == ''){
        this.toCurrency = this.previousToCurrency
      }
    }
  }
}
