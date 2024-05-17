import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userProfile: any;
  isOwnProfile: boolean = false;
  userRole: number = 1;
  private destroy$ = new Subject<void>();
  userId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const userId = params['userId'];
      if (userId) {
        this.userId = userId;
        this.loadUserProfile(userId);
        this.isOwnProfile = userId === this.authService.getCurrentUserId();
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  loadUserProfile(userId: string): void {
    this.userService.getUserProfile(userId).pipe(takeUntil(this.destroy$)).subscribe({
      next: userProfile => {
        this.userProfile = userProfile;
        this.userRole = userProfile.role;
      },
      error: () => this.router.navigate(['/'])
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
