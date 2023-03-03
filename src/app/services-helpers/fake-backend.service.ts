import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface MemoryElement {
  value: number;
  backgroundColor: string;
}

@Injectable({
  providedIn: 'root',
})
export class FakeBackendService {

  private listMatrixElement: MemoryElement[] = [];

  private MatrixGame: MemoryElement[][] = [];

  constructor(private httpClient: HttpClient) {}

  public getMemoryMatrix(): Observable<MemoryElement[][]> {
    let $MatrixGame = new Observable<MemoryElement[][]>((MatrixGameSubscriber) => {
      let listMatrixData: number[] = [];

      this.getData().subscribe({
        next: (data: number[]) => {
          listMatrixData = data;
        },
        complete: () => {
          this.listMatrixElement = listMatrixData.map(
            (value: number) => {
              return this.mapDataToMemoryElement(value);
            }
          );
          this.createMemoryMatrix();
          MatrixGameSubscriber.next(this.MatrixGame);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    });

    return $MatrixGame;
  }

  private createMemoryMatrix(): void {
    const columns:number = 4;
    const rows:number = 3;

    for (let index = 0; index < columns; index++) {
      this.MatrixGame[index] = new Array();
    }

    for (const element of this.listMatrixElement) {
      for (let j = 0; j < 2; j++) {
        let randomColumn:number = 0;
        let randomRow:number = 0;

        do
        {
          randomColumn = this.getRandomNumber(columns);
          randomRow = this.getRandomNumber(rows);
        } while(this.MatrixGame[randomColumn][randomRow]);

        this.MatrixGame[randomColumn][randomRow] = element;
      }
    }
  }

  private mapDataToMemoryElement(value: number): MemoryElement {
    return {
      value: value,
      backgroundColor: this.getRandomColor(),
    } as MemoryElement;
  }

  private getData(): Observable<number[]> {
    return this.httpClient.get<number[]>('assets/mock-data/mock-data.json');
  }

  private getRandomColor(): string {
    return '#' + Math.floor(0x1000000 * Math.random()).toString(16);
  }

  private getRandomNumber(max:number):number {
    return Math.floor(Math.random() * max);
  }

  public gameFinished(valueFinded:any[]): boolean {
    return this.listMatrixElement.length === valueFinded.length
  }
}
