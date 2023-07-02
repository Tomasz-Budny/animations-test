import { animate, animateChild, group, query, sequence, state, style, transition, trigger } from "@angular/animations";

const speed = "300ms";

// Nie można dodawać query do state - co jest bardzo ograniczające - jakby nie to nie trzeba byłoby przepisywać defacto tych samych styli do pliku.

export const NavItemsDropdownAnimation = 
  trigger('navItemsDropdown', [
    state('collapse', 
      style("*")
    ),
    state('expand', 
      style({
        height: "100vh",
      }),
    ),
    transition('collapse => expand', [
      style({
        height: '50px'
      }),
      query(".collapse-nav-item", [
        style({ 
          opacity: 0,
          transform: "translateY(-50px)",
          overflow: "hidden",
        })
      ]),
      group([
        sequence([
          animate(`${speed} ease`, 
          style({
            height: "100vh"
          })),
          query(".collapse-nav-item", [
            animate(`${speed} ease`, 
            style({ 
              opacity: 1,
               transform: "none"
            }))
          ]),
        ]),
        query('@navBrandHide', animateChild()),
      ])
    ]),
    transition('expand => collapse', [
      style({ height: '100vh' }),
      query(".brand", style({ opacity: 0})),
      group([
        query('@navBrandHide', animateChild()),
        query(".collapse-nav-item", [
          animate(`${speed} ease`, 
          style({ opacity: 0 }))
        ]),
        animate(`${speed} ease`, 
        style({
          height: "50px"
        })),
      ])
    ]),
])

export const NavBrand = trigger('navBrandHide', [
  state('expand', 
    style({opacity: 1})
  ),
  state('expand', 
  style({opacity: 0})
),
  transition("collapse => expand", [
    animate(`${speed} ease`)
  ]),
  transition("expand => collapse", [
    animate(`${speed} ease`)
  ]),
])