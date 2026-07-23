import { Component, OnDestroy, signal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

type ForgotPasswordStep = 'email' | 'sending' | 'sent';

@Component({
  selector: 'app-forgot-password-modal',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <section class="w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <div class="flex items-center justify-between border-b border-border px-6 py-4">
          <span class="text-sm font-semibold text-foreground">Reset Password</span>
          <button
            type="button"
            class="text-muted-foreground transition-colors hover:text-foreground"
            (click)="close.emit()"
            aria-label="Close"
          >
            <svg class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div class="p-6">
          @if (step() === 'email') {
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary">
              <svg class="h-[22px] w-[22px] text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                <rect x="2" y="4" width="20" height="16" rx="2" />
              </svg>
            </div>
            <h2 class="font-display mb-1 text-xl font-semibold text-foreground">Forgot your password?</h2>
            <p class="mb-5 text-sm text-muted-foreground">
              Enter the email address linked to your account and we'll send you a reset link.
            </p>
            <form class="flex flex-col gap-4" (ngSubmit)="submit()">
              <label class="block">
                <span class="mb-1.5 block text-sm font-medium text-foreground">Email address</span>
                <input
                  type="email"
                  name="resetEmail"
                  [(ngModel)]="email"
                  placeholder="jordan@example.com"
                  required
                  class="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </label>
              <button
                type="submit"
                class="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 active:scale-[0.99]"
              >
                Send Reset Link
                <svg class="h-[15px] w-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </form>
            <button type="button" class="mt-3 w-full text-center text-sm text-muted-foreground transition-colors hover:text-foreground" (click)="close.emit()">
              Back to Sign In
            </button>
          }

          @if (step() === 'sending') {
            <div class="flex flex-col items-center gap-4 py-8">
              <div class="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
              <p class="text-sm font-medium text-foreground">Sending reset link...</p>
            </div>
          }

          @if (step() === 'sent') {
            <div class="mb-6 flex flex-col items-center text-center">
              <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                <svg class="h-7 w-7 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="m9 11 3 3L22 4" />
                </svg>
              </div>
              <h2 class="font-display mb-2 text-xl font-semibold text-foreground">Check your inbox</h2>
              <p class="text-sm text-muted-foreground">We sent a password reset link to</p>
              <p class="mt-1 text-sm font-semibold text-foreground">{{ email }}</p>
            </div>

            <div class="mb-4 rounded-xl bg-muted p-4 text-xs leading-relaxed text-muted-foreground">
              <strong class="text-foreground">Didn't receive it?</strong> Check your spam folder. The link expires in 15 minutes.
            </div>

            <button
              type="button"
              class="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              [disabled]="countdown() > 0"
              (click)="resend()"
            >
              <svg class="h-[14px] w-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M3 21v-5h5" />
                <path d="M3 12a9 9 0 0 1 15.74-6.26L21 8" />
                <path d="M16 8h5V3" />
              </svg>
              {{ countdown() > 0 ? 'Resend in ' + countdown() + 's' : 'Resend Email' }}
            </button>

            <button type="button" class="mt-3 w-full text-center text-sm text-muted-foreground transition-colors hover:text-foreground" (click)="close.emit()">
              Back to Sign In
            </button>
          }
        </div>
      </section>
    </div>
  `,
})
export class ForgotPasswordModal implements OnDestroy {
  readonly close = output<void>();
  protected readonly step = signal<ForgotPasswordStep>('email');
  protected readonly countdown = signal(0);
  protected email = '';
  private intervalId?: number;

  ngOnDestroy(): void {
    this.clearCountdown();
  }

  protected submit(): void {
    if (!this.email) {
      return;
    }

    this.sendReset(1400);
  }

  protected resend(): void {
    if (this.countdown() > 0) {
      return;
    }

    this.sendReset(1200);
  }

  private sendReset(delay: number): void {
    this.step.set('sending');
    window.setTimeout(() => {
      this.step.set('sent');
      this.startCountdown();
    }, delay);
  }

  private startCountdown(): void {
    this.clearCountdown();
    this.countdown.set(60);
    this.intervalId = window.setInterval(() => {
      this.countdown.update((count) => {
        if (count <= 1) {
          this.clearCountdown();
          return 0;
        }
        return count - 1;
      });
    }, 1000);
  }

  private clearCountdown(): void {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }
}
