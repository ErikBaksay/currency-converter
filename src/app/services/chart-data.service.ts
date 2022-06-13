import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  constructor(private http : HttpClient) {}

  getChartData(from:any,to:any){
    let url = 'https://api.exchangerate.host/timeseries?start_date='+from[0]+'-'+from[1]+'-'+from[2]+'&end_date='+to[0]+'-'+to[1]+'-'+to[2]+'&base=USD'; 
    return this.http.get(url)
  }

}
