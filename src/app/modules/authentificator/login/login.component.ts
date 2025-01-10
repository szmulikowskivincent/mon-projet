import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router, 
    private toastr: ToastrService  
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],  
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      const users = JSON.parse(localStorage.getItem('users') || '[]');

      const user = users.find((u: { email: string }) => u.email === email);

      if (user) {
        console.log('Utilisateur trouvé:', user);

        if (user.password === '*'.repeat(user.password.length)) {
          const token = Math.random().toString(36).substring(2);

          sessionStorage.setItem('token', token);

          console.log('Token généré et stocké:', token);

          this.toastr.success('Connexion réussie!', 'Bienvenue');
          this.router.navigate(['/todo-list']); 
        } else {
          console.log('Identifiants incorrects.');
          this.toastr.error('Identifiants incorrects.', 'Erreur');
          this.loginForm.reset();
        }
      } else {
        console.log('Aucun utilisateur trouvé.');
        this.toastr.error('Utilisateur non trouvé.', 'Erreur');
        this.loginForm.reset();
      }
    }
  }

  checkSessionToken(): boolean {
    const token = sessionStorage.getItem('token');
    return token !== null;
  }
}



