import { Component, OnInit, OnDestroy, NgZone, ChangeDetectorRef, HostBinding } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription, merge } from 'rxjs';
import { mapTo, startWith, tap } from 'rxjs/operators';

import { HeaderVisibility } from '../header-visibility.enum';
import { ScrollService } from '../scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('header', [
      state(
        HeaderVisibility.Hidden,
        style({ opacity: 0, transform: 'translateY(-100%)' })
      ),
      state(
        HeaderVisibility.Visible,
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
      transition('* => *', animate('200ms ease-in'))
    ])
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private scrollSubscription: Subscription;
  visibility = HeaderVisibility.Visible;

  constructor(
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private scrollService: ScrollService) { }

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      const { scrollUp$, scrollDown$ } = this.scrollService;

      this.scrollSubscription = merge(
        scrollUp$.pipe(mapTo(HeaderVisibility.Visible)),
        scrollDown$.pipe(mapTo(HeaderVisibility.Hidden))
      ).subscribe(headerVisibility => {
        this.visibility = headerVisibility;
        this.cdr.detectChanges()
      });
    })
  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();
  }
}