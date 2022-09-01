import { RecentConversionsService } from './../../services/recent-conversions.service';
import { SavedConversionsService } from './../../services/saved-conversions.service';
import { Component, OnInit } from '@angular/core';
import { conversionInterface } from 'src/app/interfaces/conversion';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.sass'],
  animations: [
    trigger('collapseRecents', [
      state('true',style({
        transform: 'translateY(-100px)',
        opacity: 0,
        height: 0,
      })),
      state('false',style({
        transform: 'translateY(0px)',
        opacity: 1,
        height: '*',
      })),
      transition('true => false',animate('0.1s ease-in')),
      transition('false => true',animate('0.1s ease-out'))
    ])]
  })
export class RecentComponent implements OnInit {

  collapsable : any
  recents : conversionInterface[] = [] 
  recentsHidden = true

  constructor(private recentConversionsService : RecentConversionsService) { }

  ngOnInit(): void {
    this.recentConversionsService.recentsChanged.subscribe(()=>{this.recentsChanged()})

    this.recents = this.recentConversionsService.getRecents()
    this.collapsable = document.getElementById('collapsable-bottom-section-recent')
    this.collapsable!.style.display = 'none'
  }

  collapsableToggle(){
    if ( this.collapsable!.style.display == 'none'){
      this.collapsable!.style.display = 'block'
      this.recentsHidden = false
    } else {
      this.recentsHidden = true
      setTimeout(()=>{this.collapsable!.style.display = 'none'},100)  
    } 
  }

  recentsChanged(){
    this.recents = this.recentConversionsService.getRecents()
  }

  selected(from:string,to:string){
    this.recentConversionsService.selected(from,to)
  }

}