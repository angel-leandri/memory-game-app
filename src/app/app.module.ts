import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePagesComponent } from './components/pages/home-pages/home-pages.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { GamePageComponent } from './components/pages/game-page/game-page.component';
import { CardComponent } from './components/items/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePagesComponent,
    PageNotFoundComponent,
    GamePageComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
