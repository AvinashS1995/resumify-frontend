import { Component, output, signal } from '@angular/core';

type GoogleAuthStep = 'choose' | 'loading' | 'success';

const googleAccounts = [
  { name: 'Jordan Davis', email: 'jordan.davis@gmail.com', avatar: 'JD' },
  { name: 'Jordan D. (Work)', email: 'j.davis@company.io', avatar: 'JD' },
];

@Component({
  selector: 'app-google-auth-modal',
  standalone: true,
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <section class="w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <div class="flex items-center justify-between border-b border-border px-6 py-4">
          <div class="flex items-center gap-2.5">
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span class="text-sm font-semibold text-foreground">Sign in with Google</span>
          </div>
          @if (step() === 'choose') {
            <button type="button" class="text-muted-foreground transition-colors hover:text-foreground" (click)="close.emit()" aria-label="Close">
              <svg class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          }
        </div>

        <div class="p-6">
          @if (step() === 'choose') {
            <p class="mb-4 text-xs text-muted-foreground">
              Choose an account to continue to <span class="font-semibold text-foreground">Resumify</span>
            </p>
            <div class="flex flex-col gap-2">
              @for (account of accounts; track account.email) {
                <button
                  type="button"
                  class="group flex items-center gap-3 rounded-xl border border-border p-3.5 text-left transition-all hover:border-primary/30 hover:bg-muted"
                  (click)="selectAccount()"
                >
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-semibold text-white">
                    {{ account.avatar }}
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="truncate text-sm font-medium text-foreground">{{ account.name }}</div>
                    <div class="truncate text-xs text-muted-foreground">{{ account.email }}</div>
                  </div>
                </button>
              }
              <button
                type="button"
                class="flex items-center gap-3 rounded-xl border border-dashed border-border p-3.5 text-left transition-all hover:border-primary/40 hover:bg-muted"
                (click)="selectAccount()"
              >
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-lg text-muted-foreground">+</div>
                <div class="text-sm text-muted-foreground">Use another account</div>
              </button>
            </div>
            <p class="mt-4 text-center text-xs text-muted-foreground">
              To continue, Google will share your name, email address, and profile picture with Resumify.
            </p>
          }

          @if (step() === 'loading') {
            <div class="flex flex-col items-center gap-4 py-8">
              <svg class="h-9 w-9 animate-spin text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M21 12a9 9 0 1 1-6.2-8.56" />
              </svg>
              <div>
                <p class="text-center text-sm font-medium text-foreground">Signing you in...</p>
                <p class="mt-1 text-center text-xs text-muted-foreground">Verifying with Google</p>
              </div>
            </div>
          }

          @if (step() === 'success') {
            <div class="flex flex-col items-center gap-4 py-8">
              <svg class="h-10 w-10 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="m9 11 3 3L22 4" />
              </svg>
              <div>
                <p class="text-center text-sm font-semibold text-foreground">Signed in successfully!</p>
                <p class="mt-1 text-center text-xs text-muted-foreground">Redirecting to your dashboard...</p>
              </div>
            </div>
          }
        </div>
      </section>
    </div>
  `,
})
export class GoogleAuthModal {
  readonly close = output<void>();
  readonly success = output<void>();
  protected readonly step = signal<GoogleAuthStep>('choose');
  protected readonly accounts = googleAccounts;

  protected selectAccount(): void {
    this.step.set('loading');
    window.setTimeout(() => {
      this.step.set('success');
      window.setTimeout(() => this.success.emit(), 1200);
    }, 1600);
  }
}
