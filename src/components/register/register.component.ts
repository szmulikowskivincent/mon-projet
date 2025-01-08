import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';  

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService  
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;

      const passwordLength = userData.password.length;
      const maskedPassword = '*'.repeat(passwordLength); 

      userData.password = maskedPassword;

      let users = JSON.parse(localStorage.getItem('users') || '[]');

      if (users.length > 0) {
        this.toastr.info('Vous êtes déjà inscrit. Redirection vers la page de connexion.', 'Info');
        this.router.navigate(['/login']);
        return;  
      }

      users.push(userData);

      localStorage.setItem('users', JSON.stringify(users));

      console.log('Utilisateur enregistré:', userData);
      console.log('Liste des utilisateurs:', users);

      this.registerForm.reset();

      this.router.navigate(['/login']);
    }
  }
}





