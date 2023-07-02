import { group, query, style, transition, trigger } from "@angular/animations";

export const BoxAnimation = 
  trigger('boxAnimation', [
    transition(":enter", [
      group([
        style({
          opacity: 0,
        }),
        query("list-item", [
          style({
            opacity: 0
          })
        ])
      ]),
      group([
        style({
          opacity: 0,
        }),
        query("list-item", [
          style({
            opacity: 0
          })
        ])
      ]),
    ])
  ])