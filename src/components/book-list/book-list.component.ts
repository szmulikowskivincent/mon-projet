import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: { title: string, author: string }[] = [];
  newBook: { title: string, author: string } = { title: '', author: '' };
  editingIndex: number | null = null;
  updatedBook: { title: string, author: string } = { title: '', author: '' };

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadBooksFromLocalStorage();
  }

  loadBooksFromLocalStorage(): void {
    const books = localStorage.getItem('books');
    if (books) {
      this.books = JSON.parse(books);
    }
  }

  saveBooksToLocalStorage(): void {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  addBook(): void {
    if (this.newBook.title && this.newBook.author) {
      this.books.push({ ...this.newBook });
      this.newBook = { title: '', author: '' };
      this.saveBooksToLocalStorage();
      this.toastr.success('Livre ajouté avec succès!', 'Succès');
    } else {
      this.toastr.error('Veuillez remplir tous les champs.', 'Erreur');
    }
  }

  deleteBook(index: number): void {
    const bookToDelete = this.books[index];
    this.books.splice(index, 1);
    this.saveBooksToLocalStorage();
    this.toastr.success(`Le livre "${bookToDelete.title}" a été supprimé.`, 'Succès');
  }

  startEditing(index: number): void {
    this.editingIndex = index;
    this.updatedBook = { ...this.books[index] };
  }

  cancelEditing(): void {
    this.editingIndex = null;
  }

  updateBook(): void {
    if (this.updatedBook.title && this.updatedBook.author) {
      this.books[this.editingIndex!] = { ...this.updatedBook };
      this.saveBooksToLocalStorage();
      this.cancelEditing();
      this.toastr.success('Le livre a été mis à jour avec succès!', 'Succès');
    } else {
      this.toastr.error('Veuillez remplir tous les champs.', 'Erreur');
    }
  }
}

