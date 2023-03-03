import { MemoryElement } from './../../../services-helpers/fake-backend.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { rotate } from 'src/app/services-helpers/animation';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [rotate],
})
export class CardComponent implements OnInit {

  @Input() valueCard: MemoryElement = {} as MemoryElement;
  @Output() cardEvent: EventEmitter<any> = new EventEmitter<any>();

  rotateCardState: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public retrocardClick(): void {
    this.rotateCardState = !this.rotateCardState;
  }
}
