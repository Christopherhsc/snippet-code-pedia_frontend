// components/card-details/card-details.component.ts
import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit, OnDestroy {
  @Input() snippet: any;
  @Input() showDeleteSnippet: boolean = false;
  @Input() userProfile: any = null;
  @Output() deleteSnippet = new EventEmitter<string>();

  private userProfileSubscription!: Subscription;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userProfileSubscription = this.userService.userProfile$.subscribe((profile) => {
      this.userProfile = profile;
    });
  }

  routeToSnippetOverview(_id: string) {
    this.router.navigate(['snippet/', this.snippet._id]);
  }

  routeToUserProfile(userId: string): void {
    console.log(userId)
    this.router.navigate(['/profile', userId])
  }

  onDeleteSnippet(event: Event) {
    event.stopPropagation();
    this.deleteSnippet.emit(String(this.snippet._id));
  }

  ngOnDestroy(): void {
    if (this.userProfileSubscription) {
      this.userProfileSubscription.unsubscribe();
    }
  }
}
