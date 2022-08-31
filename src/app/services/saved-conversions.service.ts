import { conversionInterface } from './../interfaces/conversion';
import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SavedConversionsService {

  favorites : conversionInterface[] = []
  favoritesChanged = new EventEmitter()
  favoriteSelected = new EventEmitter()

  constructor() { }

  getFavorites(){
    let favoritesTemp = localStorage.getItem('favorites')
    
    if (favoritesTemp != null){
      this.favorites = JSON.parse(favoritesTemp)
    } 
    return this.favorites
  }

  addToFavorites(fromCurrency:string,toCurrency:string){
    let conversion : conversionInterface = {from:fromCurrency,to:toCurrency}
    this.favorites.push(conversion)
    localStorage.setItem('favorites',JSON.stringify(this.favorites))
  }

  removeFromFavorites(id:number){
    if (id == -1){
      return
    }
    this.favorites.splice(id,1)
    localStorage.setItem('favorites',JSON.stringify(this.favorites))
  }

  isFavorite(from:string,to:string,returnID:boolean){
    let id = -1
    let isFavorite = false
    this.favorites.forEach((favorite)=>{
      if (favorite.from == from &&
          favorite.to == to){
            id = this.favorites.indexOf(favorite)
            isFavorite = true
          }
    }) 
    if (returnID){
      return {isFavorite : isFavorite, id: id}
    } else {
      return isFavorite
    }
  }

  favoriteToggle(from:string,to:string){    
    let response = this.isFavorite(from,to,true)
    if (response != false){
      if (response.isFavorite){
        this.removeFromFavorites(response.id)
      } else {
        this.addToFavorites(from,to)
      }
    } 
    this.eventsChanged()
  }

  eventsChanged(){
    this.favoritesChanged.emit()
  }

  selected(from:string,to:string){
    this.favoriteSelected.emit({from:from,to:to})
  }
}
