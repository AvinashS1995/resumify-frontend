import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { screenPath, type Screen } from '../../screens';
import { ForgotPasswordModal } from '../shared/forgot-password-modal';
import { GoogleAuthModal } from '../shared/google-auth-modal';

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [FormsModule, GoogleAuthModal, ForgotPasswordModal],
  templateUrl: './login-screen.html',
})
export class LoginScreen {
  private readonly router = inject(Router);

  protected readonly showPassword = signal(false);
  protected readonly mode = signal<'user' | 'admin'>('user');
  protected readonly showGoogle = signal(false);
  protected readonly showForgot = signal(false);
  protected email = '';
  protected password = '';

  protected handleLogin(): void {
    this.go(this.mode() === 'admin' ? 'admin-dashboard' : 'user-dashboard');
  }

  protected go(screen: Screen): void {
    void this.router.navigateByUrl(screenPath(screen));
  }

  protected togglePassword(): void {
    this.showPassword.update((value) => !value);
  }

  protected handleGoogleSuccess(): void {
    this.showGoogle.set(false);
    this.handleLogin();
  }
}
