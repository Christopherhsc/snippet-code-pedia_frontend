import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { DataService } from './data.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userProfileSubject = new BehaviorSubject<any>(null)
  public userProfile$ = this.userProfileSubject.asObservable()

  constructor(private dataService: DataService) {}

  updateUserProfile(userData: any) {
    this.userProfileSubject.next(userData)
  }

  clearUserProfile() {
    this.userProfileSubject.next(null)
  }

  getUserProfile(userId: string): Observable<any> {
    // Use DataService to fetch user profile by ID
    return this.dataService.getUserById(userId);
  }
}
