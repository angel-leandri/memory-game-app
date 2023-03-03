import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const rotate = [
  trigger('rotateCard', [
    state(
      'false',
      style({
        transform: 'rotateY(180deg)',
        visibility: 'visible',
      })
    ),
    state(
      'true',
      style({
        transform: 'rotateY(0)',
        visibility: 'hidden',
        opacity: 0,
      })
    ),
    transition('true => false', animate('500ms ease-out')),
    transition('false => true', animate('500ms ease-in')),
  ]),
];
