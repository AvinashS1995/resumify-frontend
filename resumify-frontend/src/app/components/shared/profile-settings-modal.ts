import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type ProfileTab = 'profile' | 'security' | 'notifications' | 'account';
type NotificationPreferenceKey =
  | 'aiAnalysis'
  | 'resumeExport'
  | 'newTemplates'
  | 'weeklyDigest'
  | 'marketing';

interface NotificationPreference {
  key: NotificationPreferenceKey;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-profile-settings-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile-settings-modal.html',
})
export class ProfileSettingsModal {
  readonly close = output<void>();

  protected readonly tab = signal<ProfileTab>('profile');
  protected readonly saving = signal(false);
  protected readonly saved = signal(false);
  protected readonly showOldPassword = signal(false);
  protected readonly showNewPassword = signal(false);
  protected readonly tabs: { key: ProfileTab; label: string }[] = [
    { key: 'profile', label: 'Profile' },
    { key: 'security', label: 'Security' },
    { key: 'notifications', label: 'Notifications' },
    { key: 'account', label: 'Account' },
  ];
  protected readonly preferences: NotificationPreference[] = [
    { key: 'aiAnalysis', title: 'AI Analysis Results', desc: 'When your resume analysis is complete' },
    { key: 'resumeExport', title: 'Resume Exports', desc: 'When your PDF is ready to download' },
    { key: 'newTemplates', title: 'New Templates', desc: 'When admin adds new approved templates' },
    { key: 'weeklyDigest', title: 'Weekly Digest', desc: 'Summary of your resume activity each week' },
    { key: 'marketing', title: 'Product Updates & Tips', desc: 'Tips, webinars, and feature announcements' },
  ];
  protected readonly sessions = [
    { device: 'MacBook Pro 14"', location: 'San Francisco, CA', time: 'Now', current: true },
    { device: 'iPhone 15 Pro', location: 'San Francisco, CA', time: '2h ago', current: false },
  ];
  protected profile = {
    firstName: 'Jordan',
    lastName: 'Davis',
    email: 'jordan.davis@gmail.com',
    phone: '+1 (415) 555-0102',
    location: 'San Francisco, CA',
    jobTitle: 'Senior Product Designer',
    bio: 'Passionate about creating user-centred digital experiences.',
  };
  protected notificationPrefs: Record<NotificationPreferenceKey, boolean> = {
    aiAnalysis: true,
    resumeExport: true,
    newTemplates: true,
    weeklyDigest: false,
    marketing: false,
  };

  protected save(): void {
    this.saving.set(true);
    window.setTimeout(() => {
      this.saving.set(false);
      this.saved.set(true);
      window.setTimeout(() => this.saved.set(false), 2500);
    }, 1200);
  }

  protected togglePreference(key: NotificationPreferenceKey): void {
    this.notificationPrefs = {
      ...this.notificationPrefs,
      [key]: !this.notificationPrefs[key],
    };
  }

  protected toggleOldPassword(): void {
    this.showOldPassword.update((value) => !value);
  }

  protected toggleNewPassword(): void {
    this.showNewPassword.update((value) => !value);
  }
}
