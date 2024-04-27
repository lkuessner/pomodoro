import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TimerService } from '../../services';
import { Subscription } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { Timer } from '../../interfaces/timer';

@Component({
  selector: 'app-tab-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIcon],
  templateUrl: './tab-navigation.component.html',
  styleUrl: './tab-navigation.component.scss',
})
export class TabNavigationComponent implements OnInit {
  navigationItems: Array<Route> = [];
  timer!: Timer;
  timerServiceSubscription!: Subscription;
  constructor(private router: Router, private timerService: TimerService) {}

  ngOnInit(): void {
    this.navigationItems = this.router.config.filter(
      (route) => route.path !== '**'
    );
    this.timerServiceSubscription = this.timerService
      .getTimer()
      .subscribe((state) => {
        this.timer = state;
      });
  }
}
