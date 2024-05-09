// src/app/data.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  private getUserIdFromSession() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    return loggedInUser ? JSON.parse(loggedInUser)._id : null;
  }

  getAllSnippets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}snippets`);
  }

  getSnippetById(snippetId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}snippets/detail/${snippetId}`);
  }

  getUserSnippets(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}snippets/${userId}`);
  }

  getRandomSnippets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}snippets/random`);
  }

  saveUserData(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}users/new`, userData);
  }

  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}users/login`, { email, password });
  }

  postSnippet(snippetData: any): Observable<any> {
    const userId = this.getUserIdFromSession();
    const snippetWithUserId = { ...snippetData, userId };
    return this.http.post(`${this.baseUrl}snippets`, snippetWithUserId);
  }

  deleteSnippet(snippetId: string): Observable<any> {
    const userId = this.getUserIdFromSession();
    const headers = new HttpHeaders({ 'user-id': userId });
    return this.http.delete(`${this.baseUrl}snippets/${snippetId}`, { headers });
  }

  search(term: string): Observable<any> {
    return this.http.get(`${this.baseUrl}search?term=${term}`);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}users/${userId}`);
  }

  getUserProfileImage(userId: string): string {
    return `${this.baseUrl}users/proxy-profile-image?userId=${encodeURIComponent(userId)}`;
  }
}
