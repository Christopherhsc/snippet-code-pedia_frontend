import { Injectable } from '@angular/core'
import { DataService } from './data.service'
import { BehaviorSubject, Observable, tap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SnippetService {
  private snippetCount = new BehaviorSubject<number>(0)
  private snippets = new BehaviorSubject<any[]>([])


  private snippetCreated = new BehaviorSubject<any>(null);
  snippetCreated$ = this.snippetCreated.asObservable();

  constructor(private dataService: DataService) {
    this.loadInitialSnippets()
  }

  loadInitialSnippets() {
    this.dataService.getAllSnippets().subscribe((snippets) => {
      this.snippets.next(snippets)
      this.snippetCount.next(snippets.length)
    })
  }

  addSnippet(newSnippet: any): Observable<any> {
    return this.dataService.postSnippet(newSnippet).pipe(
      tap(snippet => {
        this.snippetCreated.next(snippet);
      })
    );
  }
  

  public getMaxSnippets(userRole: number): number {
    switch (userRole) {
      case 1:
        return 5
      case 2:
        return 15
      default:
        return Infinity
    }
  }

  getAllSnippets(): Observable<any[]> {
    return this.dataService.getAllSnippets()
  }

  getUserSnippets(userId: string): Observable<any[]> {
    return this.dataService.getUserSnippets(userId)
  }

  getSnippetById(snippetId: string): Observable<any> {
    return this.dataService.getSnippetById(snippetId)
  }

  postSnippet(snippetData: any): Observable<any> {
    return this.dataService.postSnippet(snippetData)
  }

  deleteSnippet(snippetId: string): Observable<any> {
    return this.dataService.deleteSnippet(snippetId)
  }
}
