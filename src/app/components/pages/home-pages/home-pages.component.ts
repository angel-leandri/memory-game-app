import { Component } from '@angular/core';
import { scaleWord } from 'src/app/services-helpers/animation';
@Component({
  selector: 'home-pages',
  templateUrl: './home-pages.component.html',
  styleUrls: ['./home-pages.component.scss'],
  animations:[scaleWord]
})
export class HomePagesComponent {

  public scaleWord:boolean = true;

  constructor() { }

  public doScaleAnimation(): void {
    this.scaleWord = !this.scaleWord;
  }



}
