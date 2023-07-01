import { animate, group, query, sequence, state, style, transition, trigger } from "@angular/animations";

const speed = "300ms";

export const NavItemsDropdownAnimation = 
  trigger('navItemsDropdown', [
    state('collapse', 
      style("*")
    ),
    state('expand', 
      style("*"),
    ),
    transition('collapse => expand', [
      query(".collapse-nav-item", [
        style({ 
          opacity: 0,
          transform: "translateY(-50px)",
          overflow: "hidden"
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
        query(".brand", 
        animate(`${speed} ease`, 
        style({ opacity: 0})
      )),
      ])
    ]),
    transition('expand => collapse', [
      style({ height: '100vh' }),
      query(".brand", style({ opacity: 0})),
      group([
        query(".brand", 
          animate(`${speed} ease`, 
          style({ opacity: 1})
        )),
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