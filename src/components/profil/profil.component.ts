import { NgIfContext } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  profileForm!: FormGroup;
  avatarUrl: string | null = null;
  initials: string = '';
  defaultAvatar!: TemplateRef<NgIfContext<string | null>> | null;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      this.initials = profileData.username ? this.getInitials(profileData.username) : '';
      this.avatarUrl = profileData.avatarUrl || null;
    }

    this.profileForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      house: ['', Validators.required],
      commune: ['', Validators.required],
      city: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      gender: ['male', Validators.required],
      maritalStatus: ['single', Validators.required]
    });

    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      this.profileForm.patchValue(profileData);
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarUrl = reader.result as string;
        this.profileForm.patchValue({ avatarUrl: this.avatarUrl });
      };
      reader.readAsDataURL(file);
    }
  }

  getInitials(username: string): string {
    const initials = username.split(' ').map((word: string) => word.charAt(0).toUpperCase()).join('');
    return initials || 'AA'; 
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const profileData = this.profileForm.value;
      localStorage.setItem('userProfile', JSON.stringify({
        ...profileData,
        initials: this.getInitials(profileData.username),
        avatarUrl: this.avatarUrl
      }));
      console.log('Formulaire soumis et profil sauvegardé dans localStorage!', profileData);
    }
  }

  getStoredInitials(): string {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      const profileData = JSON.parse(storedProfile);
      return profileData.initials || 'AA';
    }
    return 'AA';
  }
}


