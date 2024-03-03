import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private navListVisibleSource = new BehaviorSubject<boolean>(false);
  navListVisible$ = this.navListVisibleSource.asObservable();

  constructor() {}

  setNavListVisible(isVisible: boolean) {
    this.navListVisibleSource.next(isVisible);
  }

  toggleNavListVisible() {
    this.navListVisibleSource.next(!this.navListVisibleSource.getValue());
  }
}
