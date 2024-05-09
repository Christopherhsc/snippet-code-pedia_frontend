import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { UserService } from '../shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  randomSnippet: any[] = [];
  userProfile: any = null;

  private userProfileSubscription!: Subscription;


  constructor(
    private dataService: DataService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userProfileSubscription = this.userService.userProfile$.subscribe((profile) => {
      this.userProfile = profile;
    });
    this.loadRandomSnippets();
  }


  loadRandomSnippets() {
    this.dataService.getRandomSnippets().subscribe(
      (data) => {
        this.randomSnippet = data;
      },
      (error) => {
        console.error('Error fetching random snippets', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.userProfileSubscription) {
      this.userProfileSubscription.unsubscribe();
    }
  }
}
