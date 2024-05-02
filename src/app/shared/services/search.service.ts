import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { DataService } from './data.service'

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private dataService: DataService) {}

  search(term: string): Observable<any> {
    return this.dataService.search(term)
  }
}
