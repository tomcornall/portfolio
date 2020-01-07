import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[hover-class]'
})
export class HoverClassDirective {
  @Input('hover-class') hoverClass: any;

  constructor(public elementRef: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    let classArray = this.hoverClass.split(" ");

    classArray.forEach(hoverClass => {
      this.elementRef.nativeElement.classList.add(hoverClass);
    });
  }

  @HostListener('mouseleave') onMouseLeave() {
    let classArray = this.hoverClass.split(" ");

    classArray.forEach(hoverClass => {
      this.elementRef.nativeElement.classList.remove(hoverClass);
    });
  }

}
