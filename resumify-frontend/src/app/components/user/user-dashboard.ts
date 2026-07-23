import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { screenPath, type Screen } from '../../screens';
import { Navbar } from '../shared/navbar';

const recentResumes = [
  {
    id: '1',
    title: 'Senior Product Designer',
    template: 'Executive',
    updated: 'Today, 2:14 PM',
    score: 87,
    status: 'strong',
  },
  {
    id: '2',
    title: 'UX Lead - Figma',
    template: 'Modern',
    updated: 'Yesterday, 10:30 AM',
    score: 74,
    status: 'good',
  },
  {
    id: '3',
    title: 'Product Manager',
    template: 'Classic',
    updated: 'Jul 9, 2026',
    score: 61,
    status: 'fair',
  },
];

const statCards = [
  { label: 'Resumes Created', value: '3', delta: '+1 this week' },
  { label: 'Avg. AI Score', value: '74', delta: '+6 pts improved' },
  { label: 'Best Score', value: '87/100', delta: 'Senior PD resume' },
];

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [Navbar],
  templateUrl: './user-dashboard.html',
})
export class UserDashboard {
  private readonly router = inject(Router);

  protected readonly recentResumes = recentResumes;
  protected readonly statCards = statCards;

  protected go(screen: Screen): void {
    void this.router.navigateByUrl(screenPath(screen));
  }

  protected scoreClass(status: string): string {
    return {
      strong: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      good: 'text-blue-600 bg-blue-50 border-blue-200',
      fair: 'text-amber-600 bg-amber-50 border-amber-200',
    }[status] ?? 'text-muted-foreground bg-muted border-border';
  }
}
