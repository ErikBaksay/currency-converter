import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  fromCurrency : string = 'AED'
  toCurrency : string = 'AFN'

  fromCurrencyChange : Subject<string> = new Subject<string>()
  toCurrencyChange : Subject<string> = new Subject<string>()

  constructor(private http : HttpClient) {}

  currencySelectionChanged(newFrom:string,newTo:string){
    this.fromCurrency = newFrom
    this.toCurrency = newTo

    this.fromCurrencyChange.next(newFrom)
    this.toCurrencyChange.next(newTo)
  }

  getSelectedCurrencies(){
    return [this.fromCurrency,this.toCurrency]
  }

  getChartData(from:any,to:any){
    let fromCopy = [...from]
    let toCopy = [...to] 
    //fromCopy[1] += 1 
    //toCopy[1] += 1
    if (String(fromCopy[1]).length == 1){
      fromCopy[1] = '0'+String(fromCopy[1]+1)
    }
    if (String(fromCopy[2]).length == 1){
      fromCopy[2] = '0'+String(fromCopy[2])
    }
    if (String(toCopy[1]).length == 1){
      toCopy[1] = '0'+String(toCopy[1]+1)
    }
    if (String(toCopy[2]).length == 1){
      toCopy[2] = '0'+String(toCopy[2])
    }
    
    let url = 'https://api.exchangerate.host/timeseries?start_date='+fromCopy[0]+'-'+fromCopy[1]+'-'+fromCopy[2]+'&end_date='+toCopy[0]+'-'+toCopy[1]+'-'+toCopy[2]+'&base='+this.fromCurrency+'&symbols='+this.toCurrency; 
    
    return this.http.get(url)
  }

}
