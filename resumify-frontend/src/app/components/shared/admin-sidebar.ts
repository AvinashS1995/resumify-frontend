import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { screenPath, type Screen } from '../../screens';

const adminLinks: { label: string; screen: Screen; icon: 'chart' | 'template' | 'users' }[] = [
  { icon: 'chart', label: 'Analytics', screen: 'admin-dashboard' },
  { icon: 'template', label: 'Templates', screen: 'admin-templates' },
  { icon: 'users', label: 'User Tracking', screen: 'admin-users' },
];

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  templateUrl: './admin-sidebar.html',
})
export class AdminSidebar {
  private readonly router = inject(Router);

  readonly current = input.required<Screen>();
  protected readonly links = adminLinks;

  protected go(screen: Screen): void {
    void this.router.navigateByUrl(screenPath(screen));
  }
}
