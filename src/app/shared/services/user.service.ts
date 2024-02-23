import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userProfileSubject = new BehaviorSubject<any>(null)
  public userProfile$ = this.userProfileSubject.asObservable()

  updateUserProfile(userData: any) {
    this.userProfileSubject.next(userData)
    console.log(userData)
  }

  clearUserProfile() {
    this.userProfileSubject.next(null)
  }

  getUserProfile() {
    return this.userProfileSubject.getValue()
  }
}
