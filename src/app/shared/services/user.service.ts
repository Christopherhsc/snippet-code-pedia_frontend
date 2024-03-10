import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userProfileSubject = new BehaviorSubject<any>(null)
  public userProfile$ = this.userProfileSubject.asObservable()

  constructor() {}

  updateUserProfile(userData: any) {
    this.userProfileSubject.next(userData)
  }

  clearUserProfile() {
    this.userProfileSubject.next(null)
  }

  getUserProfile() {
    return this.userProfile$;
  }


}
