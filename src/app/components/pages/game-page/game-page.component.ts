import { Subject } from 'rxjs';
import { CardDetail } from './../../items/card/card.component';
import { MemoryElement } from './../../../services-helpers/fake-backend.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FakeBackendService } from 'src/app/services-helpers/fake-backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit, OnDestroy {

  public matrix:MemoryElement[][] = [];

  private $cheakMatrix:Subject<CardDetail[]> = new Subject<CardDetail[]>();

  private cardSelected:CardDetail[] = [];

  public holeCardAction:boolean = true;

  public valueFinded:number[] = [];

  private startCheckProcess:any;

  public countMove:number = 0;

  constructor(private fakeBackendService:FakeBackendService,
              private router:Router) { }


  ngOnDestroy(): void {
    this.$cheakMatrix.unsubscribe();
  }

  ngOnInit(): void {
    this.getMatrixGame();
    this.checkMatrix();
  }

  private getMatrixGame(): void {
    this.fakeBackendService.getMemoryMatrix().subscribe({
      next:(matrix:MemoryElement[][]) => {
        this.matrix = matrix;
      }
    });
  }

  public getCard(card:CardDetail): void {
    if(this.cardSelected.length <= 2) {

      if(this.cardSelected[0] && (this.cardSelected[0].poistionX == card.poistionX && this.cardSelected[0].postionY == card.postionY)) {
        this.cardSelected = new Array();
        clearTimeout(this.startCheckProcess);
        this.countMove++;
        this.startCheckProcess = null;
        return;
      }

      this.cardSelected.push(card);

      if(this.cardSelected.length == 1) {
        this.holeCardAction = false;
        this.startCheckProcess = setTimeout(() => {
          if(this.cardSelected[1])
            this.$cheakMatrix.next(this.cardSelected);
          else
            this.holeCardAction = true;
          this.cardSelected = new Array();
          this.countMove++;
        },5000);
      }
      else if(this.cardSelected.length == 2) {
        this.$cheakMatrix.next(this.cardSelected);
        clearTimeout(this.startCheckProcess);
        this.startCheckProcess = null;
        this.countMove++;
        this.cardSelected = new Array();
      }
    }
  }

  public checkMatrix(): void {
    this.$cheakMatrix.subscribe({
      next:(cards:CardDetail[]) => {
          const cardFirst = cards[0];
          const cardSecond = cards[1];

          if(this.matrix[cardFirst.postionY][cardFirst.poistionX].value == this.matrix[cardSecond.postionY][cardSecond.poistionX].value) {
            this.valueFinded.push(cardFirst.value);

            const isFinish = this.fakeBackendService.gameFinished(this.valueFinded);

            if(isFinish)
              this.router.navigate(["/home"]);
          }
          else {
            this.holeCardAction = true;
          }
      },
    });
  }

}
