import { MemoryElement } from './../../../services-helpers/fake-backend.service';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { rotate } from 'src/app/services-helpers/animation';
export interface CardDetail {
  value: number;
  poistionX: number;
  postionY: number;
}
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [rotate],
})
export class CardComponent {
  @Input() valueCard: MemoryElement = {} as MemoryElement;

  @Input() poistionX: number = 0;

  @Input() poistionY: number = 0;

  @Input() disabled: boolean = false;

  @Output() cardEvent: EventEmitter<CardDetail> =
    new EventEmitter<CardDetail>();

  public rotateCardState: boolean = true;

  private isCardCliked: boolean = false;

  constructor(public cdr: ChangeDetectorRef) {
    /* TODO document why this constructor is empty */
  }

  @Input() set holeCard(holeCardStatus: boolean) {
    this.cdr.detectChanges();

    if (!this.disabled && holeCardStatus) this.rotateCardState = true;
  }

  public retroCardClick(): void {
    this.isCardCliked = true;
    this.rotateCardState = !this.rotateCardState;
  }

  public finishAnimation(): void {
    if (this.isCardCliked) {
      const detailCard: CardDetail = {
        value: this.valueCard.value,
        poistionX: this.poistionX,
        postionY: this.poistionY,
      };
      this.cardEvent.emit(detailCard);
    }

    this.isCardCliked = false;
  }
}
