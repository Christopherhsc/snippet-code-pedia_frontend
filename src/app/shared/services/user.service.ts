import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/'

  private userProfileSubject = new BehaviorSubject<any>(null)
  public userProfile$ = this.userProfileSubject.asObservable()

  constructor(private http: HttpClient) {}

  updateUserProfile(userData: any) {
    this.userProfileSubject.next(userData)
  }

  clearUserProfile() {
    this.userProfileSubject.next(null)
  }

  getUserProfile() {
    return this.userProfileSubject.getValue()
  }

  //HTTP
  //BACKEND COMMUNICATION
  saveUserData(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}users/new`, userData)
  }

  loginUser(email: string, password: string): Observable<any> {
    // Replace with your API endpoint for SCP user login
    return this.http.post(`${this.baseUrl}users/login`, { email, password })
  }
}
