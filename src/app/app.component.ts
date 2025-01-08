import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mon-projet';

  constructor(private toastr: ToastrService) {}

  showSuccess() {
    this.toastr.success('Tâche ajoutée avec succès!', 'Succès');
  }

  showError() {
    this.toastr.error('Erreur lors de l\'ajout de la tâche.', 'Erreur');
  }
}
