import { Injectable } from '@angular/core'
import { DataService } from './data.service'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SnippetService {
  private snippetCount = new BehaviorSubject<number>(0)
  private snippets = new BehaviorSubject<any[]>([])

  snippetCount$ = this.snippetCount.asObservable()

  constructor(private dataService: DataService) {
    this.loadInitialSnippets()
  }

  loadInitialSnippets() {
    this.dataService.getAllSnippets().subscribe((snippets) => {
      this.snippets.next(snippets)
      this.snippetCount.next(snippets.length)
    })
  }

  addSnippet(newSnippet: any) {
    this.dataService.postSnippet(newSnippet).subscribe((snippet) => {
      const updatedSnippets = [...this.snippets.value, snippet]
      this.snippets.next(updatedSnippets)
      this.snippetCount.next(updatedSnippets.length)
    })
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
