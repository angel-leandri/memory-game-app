import { MemoryElement } from './../../../services-helpers/fake-backend.service';
import { Component, OnInit } from '@angular/core';
import { FakeBackendService } from 'src/app/services-helpers/fake-backend.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {

  public matrix:MemoryElement[][] = []

  constructor(private fakeBackendService:FakeBackendService) { }

  ngOnInit(): void {
    this.getMatrixGame();
  }

  private getMatrixGame(): void {
    this.fakeBackendService.getMemoryMatrix().subscribe({
      next:(matrix:MemoryElement[][]) => {
        this.matrix = matrix;
      }
    });
  }

}
