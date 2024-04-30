import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { CountdownState } from '../../interfaces/countdown';
import { CountdownService } from '../../services';

@Component({
  selector: 'app-tab-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIcon],
  templateUrl: './tab-navigation.component.html',
  styleUrl: './tab-navigation.component.scss',
})
export class TabNavigationComponent implements OnInit, OnDestroy {
  navigationItems: Array<Route> = [];
  countdown!: CountdownState;
  countdownSubscription$: Subscription;
  isWeckerRouteActive: boolean = false;
  constructor(
    private router: Router,
    private countdownService: CountdownService
  ) {
    this.countdownSubscription$ = this.countdownService
      .getCountdownState()
      .subscribe((state) => {
        this.countdown = state;
      });

    this.isWeckerRouteActive = this.router.url === '/';
  }

  ngOnInit(): void {
    this.navigationItems = this.router.config.filter(
      (route) => route.path !== '**'
    );
  }

  ngOnDestroy(): void {
    this.countdownSubscription$.unsubscribe();
  }
}
