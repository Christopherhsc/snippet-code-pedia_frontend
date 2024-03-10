import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnippetService {

  constructor(private dataService: DataService) {}

  getUserSnippets(userId: string): Observable<any[]> {
    return this.dataService.getUserSnippets(userId);
  }

  postSnippet(snippetData: any) {
    return this.dataService.postSnippet(snippetData);
  }
}
