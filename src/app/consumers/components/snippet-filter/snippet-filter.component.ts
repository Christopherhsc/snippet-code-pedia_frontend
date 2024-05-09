import { trigger, state, style, transition, animate } from '@angular/animations'
import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'

@Component({
  selector: 'app-snippet-filter',
  templateUrl: './snippet-filter.component.html',
  animations: [
    trigger('slideIn', [
      state(
        'open',
        style({
          transform: 'translateX(0)'
        })
      ),
      state(
        'closed',
        style({
          transform: 'translateX(-100%)'
        })
      ),
      transition('closed => open', [animate('300ms ease-in')]),
      transition('open => closed', [animate('300ms ease-out')])
    ])
  ]
})
export class SnippetFilterComponent implements OnInit {
  isOpen = false
  isSmallScreen = false

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.observeScreenSize()

    setTimeout(() => {
      this.isOpen = true
    })
  }

  observeScreenSize(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Small])
      .subscribe((result) => {
        this.isSmallScreen = result.matches
      })
  }

  closeModal(): void {
    this.isOpen = false
    setTimeout(() => {
      this.router.navigate(['../'], { relativeTo: this.route })
    }, 300)
  }
}
