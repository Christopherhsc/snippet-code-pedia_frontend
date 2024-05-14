import { trigger, state, style, transition, animate } from '@angular/animations'
import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { UserService } from 'src/app/shared/services/user.service'
import { SnippetService } from 'src/app/shared/services/snippet.service'
import { Subscription } from 'rxjs'

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
  private subscription?: Subscription;
  snippets: any[] = [];
  users: any[] = [];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private snippetService: SnippetService
  ) {}

  ngOnInit() {
    this.observeScreenSize()
    this.snippetService.getAllSnippets().subscribe()

    setTimeout(() => {
      this.isOpen = true
    })
  }

  getAllSnippets() {
    this.subscription = this.snippetService.getAllSnippets().subscribe({
      next: (snippets) => {
        console.log('Received snippets:', snippets);
        this.snippets = snippets;
      },
      error: (err) => {
        console.error('Error fetching snippets:', err);
      }
    });
  }

  getAllUsers() {
    this.subscription = this.snippetService.getAllSnippets().subscribe({
      next: (users) => {
        console.log('Received users:', users);
        this.users = users;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
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

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
