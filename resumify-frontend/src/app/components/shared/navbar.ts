import { Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { screenPath, type Screen } from '../../screens';
import { NotificationsPanel } from './notifications-panel';
import type { Notification } from './notification.model';
import { ProfileSettingsModal } from './profile-settings-modal';

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: 'ai',
    title: 'AI Analysis Complete',
    body: 'Your "Senior Product Designer" resume scored 87/100. See 3 improvement suggestions.',
    time: '2 min ago',
    read: false,
  },
  {
    id: 2,
    type: 'achievement',
    title: 'Resume Score Improved!',
    body: 'Your average resume score increased by 6 points this week. Keep it up!',
    time: '1h ago',
    read: false,
  },
  {
    id: 3,
    type: 'resume',
    title: 'PDF Export Ready',
    body: '"UX Lead - Figma" resume is ready to download.',
    time: '3h ago',
    read: false,
  },
  {
    id: 4,
    type: 'system',
    title: 'New Templates Available',
    body: '3 new admin-approved templates were added: "Impact", "Collegiate", and "Slate".',
    time: 'Yesterday',
    read: true,
  },
  {
    id: 5,
    type: 'ai',
    title: 'ATS Scan Complete',
    body: 'Your uploaded resume passed 92% of ATS keyword checks for Product Manager roles.',
    time: '2d ago',
    read: true,
  },
];

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NotificationsPanel, ProfileSettingsModal],
  templateUrl: './navbar.html',
})
export class Navbar {
  private readonly router = inject(Router);

  readonly currentScreen = input.required<Screen>();

  protected readonly mobileOpen = signal(false);
  protected readonly profileOpen = signal(false);
  protected readonly showNotifications = signal(false);
  protected readonly showProfileSettings = signal(false);
  protected readonly notifications = signal<Notification[]>(initialNotifications);
  protected readonly isAdmin = computed(() => this.currentScreen().startsWith('admin'));
  protected readonly links = computed<{ label: string; screen: Screen }[]>(() =>
    this.isAdmin()
      ? [
          { label: 'Analytics', screen: 'admin-dashboard' },
          { label: 'Templates', screen: 'admin-templates' },
          { label: 'Users', screen: 'admin-users' },
        ]
      : [
          { label: 'Dashboard', screen: 'user-dashboard' },
          { label: 'Templates', screen: 'template-selection' },
          { label: 'AI Builder', screen: 'ai-builder' },
        ],
  );
  protected readonly unreadCount = computed(
    () => this.notifications().filter((notification) => !notification.read).length,
  );

  protected go(screen: Screen): void {
    void this.router.navigateByUrl(screenPath(screen));
  }

  protected toggleNotifications(): void {
    this.showNotifications.update((value) => !value);
    this.profileOpen.set(false);
  }

  protected toggleProfile(): void {
    this.profileOpen.update((value) => !value);
    this.showNotifications.set(false);
  }

  protected toggleMobile(): void {
    this.mobileOpen.update((value) => !value);
  }

  protected markAllRead(): void {
    this.notifications.update((notifications) =>
      notifications.map((notification) => ({ ...notification, read: true })),
    );
  }

  protected markRead(id: number): void {
    this.notifications.update((notifications) =>
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  }
}
