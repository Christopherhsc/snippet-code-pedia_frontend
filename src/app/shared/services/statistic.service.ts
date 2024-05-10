import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  constructor(private userService: UserService) {}

  trackProfileVisit(userId: string): Observable<any> {
    return this.userService.trackProfileVisit(userId);
  }

  getUserProfile(userId: string): Observable<any> {
    return this.userService.getUserProfile(userId);
  }
}
