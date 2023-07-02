import { Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[NavbarMargin]'
})
export class NavbarMarginDirective implements OnInit, OnDestroy {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    const navHeight = document.querySelector('nav').clientHeight;
    this.renderer
      .setStyle(this.el.nativeElement, 'marginTop', `${navHeight}px`);
  }

  ngOnDestroy() {
    document.body.classList.remove('block-scrolling');
  }
}
