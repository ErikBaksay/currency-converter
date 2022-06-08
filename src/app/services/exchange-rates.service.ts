import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {

  constructor(private http: HttpClient) {}

  getCurrencies(){
    let url = 'https://api.exchangerate.host/symbols';
    return this.http.get(url)
  }
  getConverted(from:any,to:any,amount:number){
    let url = 'https://api.exchangerate.host/convert?from='+from+'&to='+to+'&amount='+amount;
    return this.http.get(url)
  }
}
