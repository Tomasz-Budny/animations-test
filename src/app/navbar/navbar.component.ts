import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AppBreakpoints } from '../app-breakpoints.class';
import { Observable, map, of, tap } from 'rxjs';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs';
import { NavBrand, NavItemsDropdownAnimation } from '../animations/navbar.animation';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [NavItemsDropdownAnimation, NavBrand]
})
export class NavbarComponent {

  navs: string[] = [
    "Profil",
    "Zaloguj",
    "Entertainment",
    "Accessories",
    "Support",
    "Vision"
  ]
  
  hamburgerVisible$: Observable<boolean>;
  collapsed$: Observable<boolean>;
  collapseClicked$ = new Subject<boolean>();
  collapseState$: Observable<string>;
  isCollapsed: Boolean = false;

  constructor(
    private responsive: BreakpointObserver,
  ) {}

  ngOnInit() {
    this.hamburgerVisible$ = this.responsive
      .observe([AppBreakpoints.Small])
      .pipe(
        map(result => result.matches)
    );
    this.collapsed$ = this.hamburgerVisible$
      .pipe(
        switchMap(matches => matches ?  this.collapseClicked$ : of(false)), 
    )
    this.collapseState$ = this.collapsed$.pipe(
      map(expanded => expanded ? 'expand' : "collapse")
    )
  }
}
