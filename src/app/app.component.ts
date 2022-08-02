import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'currency-converter';

  ngOnInit(): void {    
    
    window.addEventListener('resize', this.appHeight)
    this.appHeight()
  }

  appHeight() {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
  }
}

