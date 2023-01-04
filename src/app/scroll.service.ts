import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { throttleTime, map, pairwise, distinctUntilChanged, tap, partition, share } from 'rxjs/operators';

import { ScrollDirection } from './scroll-direction.enum';

@Injectable()
export class ScrollService {
  scrollUp$: Observable<ScrollDirection>;
  scrollDown$: Observable<ScrollDirection>;

  constructor() {
    [this.scrollUp$, this.scrollDown$] =
      fromEvent(window, 'scroll').pipe(
        throttleTime(10),
        map(() => window.pageYOffset),
        pairwise(),
        map(([y1, y2]): ScrollDirection => (y2 < y1 ? ScrollDirection.Up : ScrollDirection.Down)),
        distinctUntilChanged(),
        share(),
        partition((scrollDirection: ScrollDirection) => scrollDirection === ScrollDirection.Up)
      );
  }
}