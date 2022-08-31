import { RecentConversionsService } from './../../services/recent-conversions.service';
import { conversionInterface } from './../../interfaces/conversion';
import { SavedConversionsService } from './../../services/saved-conversions.service';
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
  favorites : conversionInterface[] = []

  constructor(private exchangesService:ExchangeRatesService,
              private chartDataService : ChartDataService,
              private savedConversionsService : SavedConversionsService,
              private recentConversionsService : RecentConversionsService){}

  ngOnInit(): void {
    this.savedConversionsService.favoritesChanged.subscribe(()=>{this.favoritesChanged()})
    
    this.savedConversionsService.favoriteSelected.subscribe((conversion)=>{
      this.fromCurrency = conversion.from;
      this.toCurrency = conversion.to;
      this.convert()
    })
    this.recentConversionsService.recentSelected.subscribe((conversion)=>{
      this.fromCurrency = conversion.from;
      this.toCurrency = conversion.to;
      this.convert()
    })

    this.favorites = this.savedConversionsService.getFavorites()
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

    let from = this.fromCurrency
    let to = this.toCurrency 
    
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
    this.recentConversionsService.addRecent(from,to,this.supportedCurrenciesCodes)
  }
  
  switchCurrencies(){
    [this.fromCurrency, this.toCurrency] = [this.toCurrency, this.fromCurrency]
    this.convert()
  }

  isFavorite(from:string,to:string,returnID:boolean){
    return this.savedConversionsService.isFavorite(from,to,returnID)
  }

  favoriteToggle(){    
    this.savedConversionsService.favoriteToggle(this.fromCurrency,this.toCurrency)
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

  favoritesChanged(){
    this.favorites = this.savedConversionsService.getFavorites()
  }
}
