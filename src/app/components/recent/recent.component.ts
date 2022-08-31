import { RecentConversionsService } from './../../services/recent-conversions.service';
import { SavedConversionsService } from './../../services/saved-conversions.service';
import { Component, OnInit } from '@angular/core';
import { conversionInterface } from 'src/app/interfaces/conversion';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.sass']
})
export class RecentComponent implements OnInit {

  collapsable : any
  recents : conversionInterface[] = []

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
    } else {
      this.collapsable!.style.display = 'none'
    } 
  }

  recentsChanged(){
    this.recents = this.recentConversionsService.getRecents()
  }

  selected(from:string,to:string){
    this.recentConversionsService.selected(from,to)
  }

}