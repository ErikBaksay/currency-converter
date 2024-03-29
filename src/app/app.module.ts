import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConverterComponent } from './components/converter/converter.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ChartComponent } from './components/chart/chart.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { RecentComponent } from './components/recent/recent.component';


@NgModule({
  declarations: [
    AppComponent,
    ConverterComponent,
    MainPageComponent,
    ChartComponent,
    FavoritesComponent,
    RecentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
