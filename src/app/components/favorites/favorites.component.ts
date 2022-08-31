import { SavedConversionsService } from './../../services/saved-conversions.service';
import { Component, OnInit } from '@angular/core';
import { conversionInterface } from 'src/app/interfaces/conversion';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.sass']
})
export class FavoritesComponent implements OnInit {

  collapsable : any
  favorites : conversionInterface[] = []

  constructor(private savedConversionsService : SavedConversionsService) { }

  ngOnInit(): void {
    this.savedConversionsService.favoritesChanged.subscribe(()=>{this.favoritesChanged()})

    this.favorites = this.savedConversionsService.getFavorites()
    this.collapsable = document.getElementById('collapsable-bottom-section-favorites')
    this.collapsable!.style.display = 'none'
  }

  collapsableToggle(){
    if ( this.collapsable!.style.display == 'none'){
      this.collapsable!.style.display = 'block'
    } else {
      this.collapsable!.style.display = 'none'
    } 
  }

  favoriteToggle(from:string,to:string){    
    this.savedConversionsService.favoriteToggle(from,to)
  }

  favoritesChanged(){
    this.favorites = this.savedConversionsService.getFavorites()
  }

  selected(from:string,to:string){
    this.savedConversionsService.selected(from,to)
  }

}