import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { screenPath, type Screen } from '../../screens';
import { GoogleAuthModal } from '../shared/google-auth-modal';

@Component({
  selector: 'app-register-screen',
  standalone: true,
  imports: [FormsModule, GoogleAuthModal],
  templateUrl: './register-screen.html',
})
export class RegisterScreen {
  private readonly router = inject(Router);

  protected readonly showPassword = signal(false);
  protected readonly showGoogle = signal(false);
  protected readonly perks = [
    'AI-powered resume analysis & scoring',
    'Access to 25+ premium templates',
    'Real-time live preview builder',
    'Export to PDF in one click',
  ];

  protected form = {
    name: '',
    email: '',
    password: '',
  };

  protected handleSubmit(): void {
    this.go('user-dashboard');
  }

  protected go(screen: Screen): void {
    void this.router.navigateByUrl(screenPath(screen));
  }

  protected togglePassword(): void {
    this.showPassword.update((value) => !value);
  }

  protected handleGoogleSuccess(): void {
    this.showGoogle.set(false);
    this.go('user-dashboard');
  }
}
