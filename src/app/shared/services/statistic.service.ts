import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { DataService } from './data.service'

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  constructor(private dataService: DataService) {}

  trackProfileVisit(userId: string): Observable<any> {
    return this.dataService.trackProfileVisit(userId)
  }
}
