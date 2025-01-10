import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchTerm: string = '';
  filteredResults: any[] = [];
  allComments: any[] = []; 

  constructor(private http: HttpClient) {
    this.loadAllComments();
  }

  loadAllComments() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/comments').subscribe(
      (data: any[]) => {
        this.allComments = data;
      },
      (err) => console.error('Error fetching comments', err)
    );
  }

  filterByName() {
    if (this.searchTerm.trim() === '') {
      this.filteredResults = [];
      return;
    }

    this.filteredResults = this.allComments.filter(comment =>
      comment.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}


