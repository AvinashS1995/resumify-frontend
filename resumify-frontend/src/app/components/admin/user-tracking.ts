import { Component, computed, signal } from '@angular/core';
import { AdminSidebar } from '../shared/admin-sidebar';
import { Navbar } from '../shared/navbar';

type SortKey = 'name' | 'joined' | 'resumes' | 'score';
type StatusFilter = 'all' | 'active' | 'inactive';
type PlanFilter = 'all' | 'Pro' | 'Free';

const users = [
  {
    id: 1,
    name: 'Emma Chen',
    email: 'emma.chen@gmail.com',
    joined: 'Jul 10, 2026',
    resumes: 7,
    lastActive: '2h ago',
    plan: 'Pro',
    status: 'active',
    score: 88,
  },
  {
    id: 2,
    name: 'Marcus Williams',
    email: 'm.williams@outlook.com',
    joined: 'Jul 8, 2026',
    resumes: 3,
    lastActive: '8h ago',
    plan: 'Free',
    status: 'active',
    score: 72,
  },
  {
    id: 3,
    name: 'Priya Sharma',
    email: 'priya.s@company.io',
    joined: 'Jun 30, 2026',
    resumes: 12,
    lastActive: '1d ago',
    plan: 'Pro',
    status: 'active',
    score: 91,
  },
  {
    id: 4,
    name: 'Luca Ferreira',
    email: 'luca@ferreira.dev',
    joined: 'Jul 11, 2026',
    resumes: 1,
    lastActive: '20m ago',
    plan: 'Free',
    status: 'active',
    score: 55,
  },
  {
    id: 5,
    name: 'Aisha Johnson',
    email: 'aisha.j@mail.com',
    joined: 'May 14, 2026',
    resumes: 9,
    lastActive: '3d ago',
    plan: 'Pro',
    status: 'inactive',
    score: 79,
  },
  {
    id: 6,
    name: 'Noah Park',
    email: 'noah.park@design.co',
    joined: 'Apr 22, 2026',
    resumes: 5,
    lastActive: '1w ago',
    plan: 'Free',
    status: 'inactive',
    score: 63,
  },
  {
    id: 7,
    name: 'Sofia Reyes',
    email: 'sofia@reyes.mx',
    joined: 'Jun 5, 2026',
    resumes: 4,
    lastActive: '5h ago',
    plan: 'Pro',
    status: 'active',
    score: 82,
  },
  {
    id: 8,
    name: 'James Okafor',
    email: 'james.ok@fintech.ng',
    joined: 'Mar 18, 2026',
    resumes: 15,
    lastActive: '30m ago',
    plan: 'Pro',
    status: 'active',
    score: 94,
  },
];

@Component({
  selector: 'app-user-tracking',
  standalone: true,
  imports: [Navbar],
  templateUrl: './user-tracking.html',
})
export class UserTracking {
  protected readonly users = users;
  protected readonly search = signal('');
  protected readonly statusFilter = signal<StatusFilter>('all');
  protected readonly planFilter = signal<PlanFilter>('all');
  protected readonly sortKey = signal<SortKey>('joined');
  protected readonly sortDir = signal<'asc' | 'desc'>('desc');
  protected readonly openMenu = signal<number | null>(null);
  protected readonly statuses: StatusFilter[] = ['all', 'active', 'inactive'];
  protected readonly plans: PlanFilter[] = ['all', 'Pro', 'Free'];
  protected readonly pages = [1, 2, 3];
  protected readonly filtered = computed(() => {
    const query = this.search().toLowerCase();
    const status = this.statusFilter();
    const plan = this.planFilter();
    const key = this.sortKey();
    const multiplier = this.sortDir() === 'asc' ? 1 : -1;

    return users
      .filter(
        (user) =>
          (user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)) &&
          (status === 'all' || user.status === status) &&
          (plan === 'all' || user.plan === plan),
      )
      .sort((a, b) => {
        if (key === 'name') return multiplier * a.name.localeCompare(b.name);
        if (key === 'resumes') return multiplier * (a.resumes - b.resumes);
        if (key === 'score') return multiplier * (a.score - b.score);
        return multiplier * (new Date(a.joined).getTime() - new Date(b.joined).getTime());
      });
  });

  protected setSearch(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
  }

  protected setStatusFilter(filter: StatusFilter): void {
    this.statusFilter.set(filter);
  }

  protected setPlanFilter(filter: PlanFilter): void {
    this.planFilter.set(filter);
  }

  protected handleSort(key: SortKey): void {
    if (this.sortKey() === key) {
      this.sortDir.update((direction) => (direction === 'asc' ? 'desc' : 'asc'));
      return;
    }
    this.sortKey.set(key);
    this.sortDir.set('desc');
  }

  protected toggleMenu(id: number): void {
    this.openMenu.update((current) => (current === id ? null : id));
  }

  protected initials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('');
  }

  protected scoreClass(score: number): string {
    if (score >= 85) return 'text-emerald-600 bg-emerald-50';
    if (score >= 70) return 'text-blue-600 bg-blue-50';
    return 'text-amber-600 bg-amber-50';
  }
}
