import { conversionInterface } from './../interfaces/conversion';
import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecentConversionsService {

  recents : conversionInterface[] = []
  recentsChanged = new EventEmitter()
  recentSelected = new EventEmitter()

  constructor() { }

  getRecents(){
    let recentsTemp = localStorage.getItem('recents')

    if (recentsTemp != null){
      this.recents = JSON.parse(recentsTemp)
    }
    return this.recents
  }

  isRecent(from:string,to:string,){
    let id = -1
    let isRecent = false
    this.recents.forEach((recent)=>{
      if (recent.from == from &&
          recent.to == to){
            id = this.recents.indexOf(recent)
            isRecent = true
          }
    })
    return isRecent
  }

  isRealCurrency(currency:string,allCurrencies:string[]){
    if (allCurrencies.includes(currency)){
      return true
    } else {
      return false
    }
  }

  addRecent(from:string,to:string,currencies:string[]){
    if (this.isRecent(from,to)){
      return
    }

    if (this.isRealCurrency(from,currencies) && 
        this.isRealCurrency(to,currencies)){
          let conversion : conversionInterface = {from:from,to:to}
          this.recents.unshift(conversion)
          if (this.recents.length > 5){
            this.recents.pop()
          }
      
          localStorage.setItem('recents',JSON.stringify(this.recents))
      
          console.log('hello',this.recents,conversion);
      }
  }
  selected(from:string,to:string){
    this.recentSelected.emit({from:from,to:to})
  }
}
