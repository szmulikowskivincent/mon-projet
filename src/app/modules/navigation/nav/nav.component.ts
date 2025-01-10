import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userProfile: any = null;
  initials: string = '';
  avatarUrl: string | null = null;
  getUserInitials: any;
  isSubNavVisible = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      this.userProfile = JSON.parse(savedProfile);
      this.initials = this.getInitials(this.userProfile.username);
      this.avatarUrl = this.userProfile.avatarUrl;
    }
  }

  toggleSubNav() {
    this.isSubNavVisible = !this.isSubNavVisible;
  }

  logout() {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated(); 
  }

  getInitials(username: string): string {
    const initials = username.split(' ').map((word: string) => word.charAt(0).toUpperCase()).join('');
    return initials || 'AA'; 
  }
}



