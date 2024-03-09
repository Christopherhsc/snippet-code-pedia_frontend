import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SnippetService {

  constructor(private dataService: DataService) {}

  postSnippet(snippetData: any) {
    return this.dataService.postSnippet(snippetData);
  }
}
