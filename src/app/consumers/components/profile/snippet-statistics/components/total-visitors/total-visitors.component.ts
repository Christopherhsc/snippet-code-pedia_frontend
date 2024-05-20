import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-total-visitors',
  templateUrl: './total-visitors.component.html',
  styleUrls: ['./total-visitors.component.scss']
})
export class TotalVisitorsComponent implements OnInit, OnChanges {
  @Input() userProfile: any;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userProfile'] && changes['userProfile'].currentValue) {
      this.fetchVisitors();
    }
  }

  fetchVisitors(): void {
    // This method can be used to fetch visitor data if it's not already available in userProfile
    // For now, we're assuming userProfile.visitors contains the necessary data
  }
}
