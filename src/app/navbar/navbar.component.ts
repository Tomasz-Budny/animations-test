import { Component, ElementRef, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AppBreakpoints } from '../app-breakpoints.class';
import { Unsub } from '../unsub.class';
import { Observable, map, of, takeUntil, tap } from 'rxjs';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs';
import { NavItemsDropdownAnimation } from '../animations/navbar.animation';
import { AnimationEvent } from "@angular/animations";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [NavItemsDropdownAnimation]
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
  
  @ViewChild('nav') nav: ElementRef<HTMLDivElement>;
  hamburgerVisible$: Observable<boolean>;
  collapsed$: Observable<boolean>;
  collapseClicked$ = new Subject<boolean>();
  isCollapsed: Boolean = false;

  constructor(
    private responsive: BreakpointObserver,
  ) {}

  ngOnInit() {
    this.hamburgerVisible$ = this.responsive
      .observe([AppBreakpoints.Small])
      .pipe(
        map(result => result.matches),
        tap(res => {
          if(!res) {
            this.isCollapsed = false;
            this.nav.nativeElement.classList.remove('collapsed');
          }
        })
    );

    this.collapsed$ = this.hamburgerVisible$
      .pipe(
        switchMap(matches => matches ?  this.collapseClicked$ : of(false)),   
    )
  }

  onCollapseToggle(event: AnimationEvent) {
    if(this.isCollapsed) {
      this.nav.nativeElement.classList.add('collapsed');
    }
    else {
      this.nav.nativeElement.classList.remove('collapsed');
    }
  }
}
