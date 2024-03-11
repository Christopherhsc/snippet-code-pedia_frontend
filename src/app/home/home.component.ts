import { Component, OnInit } from '@angular/core'
import { DataService } from '../shared/services/data.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',

})
export class HomeComponent {

  randomSnippet: any[] = []

  constructor(
    private dataService: DataService,
  ) {}

  ngOnInit() {
    this.loadRandomSnippets()
  }

  loadRandomSnippets() {
    this.dataService.getRandomSnippets().subscribe(
      (data) => {
        this.randomSnippet = data;
      },
      (error) => {
        console.error('Error fetching random snippets', error);
      }
    );
  }
}
