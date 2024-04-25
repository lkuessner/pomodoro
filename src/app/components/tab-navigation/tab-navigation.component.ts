import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-tab-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './tab-navigation.component.html',
  styleUrl: './tab-navigation.component.scss',
})
export class TabNavigationComponent implements OnInit {
  navigationItems: Array<Route> = [];
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.navigationItems = this.router.config.filter(
      (route) => route.path !== '**'
    );
    console.log('this.navigationItems', this.navigationItems);
  }
}
