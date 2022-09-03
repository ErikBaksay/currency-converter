import { SavedConversionsService } from './../../services/saved-conversions.service';
import { Component, OnInit } from '@angular/core';
import { conversionInterface } from 'src/app/interfaces/conversion';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.sass'],
  animations: [
    trigger('collapseFavorite', [
      state('true',style({
        height: 0,
      })),
      state('false',style({

      })),
      transition('true => false',animate('0.1s ease-in')),
      transition('false => true',animate('0.1s ease-out'))
    ])]
})
export class FavoritesComponent implements OnInit {

  collapsable : any
  favorites : conversionInterface[] = []
  favoritesHidden = true

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
      this.favoritesHidden = false
    } else {
      this.favoritesHidden = true
      setTimeout(()=>{this.collapsable!.style.display = 'none'},100)
      
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