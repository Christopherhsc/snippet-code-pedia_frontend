import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAppMouseBackground]',
})
export class AppMouseBackgroundDirective {

  private circle: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Create a circle element
    this.circle = this.renderer.createElement('div');
    this.renderer.addClass(this.circle, 'mouse-circle');
    this.renderer.appendChild(this.el.nativeElement, this.circle);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const x = event.clientX - this.el.nativeElement.offsetLeft - 100; // 100 is half the width/height of the circle for centering
    const y = event.clientY - this.el.nativeElement.offsetTop - 100;
    this.renderer.setStyle(this.circle, 'left', `${x}px`);
    this.renderer.setStyle(this.circle, 'top', `${y}px`);
  }
}