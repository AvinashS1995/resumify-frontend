import { Component, computed, input, output, signal } from '@angular/core';
import type { Notification, NotificationType } from './notification.model';

type NotificationFilter = 'all' | NotificationType;

const filters: NotificationFilter[] = ['all', 'ai', 'resume', 'achievement', 'system'];

@Component({
  selector: 'app-notifications-panel',
  standalone: true,
  templateUrl: './notifications-panel.html',
})
export class NotificationsPanel {
  readonly notifications = input.required<Notification[]>();
  readonly close = output<void>();
  readonly markAllRead = output<void>();
  readonly markRead = output<number>();

  protected readonly showAll = signal(false);
  protected readonly filter = signal<NotificationFilter>('all');
  protected readonly filters = filters;
  protected readonly unreadCount = computed(
    () => this.notifications().filter((notification) => !notification.read).length,
  );
  protected readonly filteredNotifications = computed(() => {
    const activeFilter = this.filter();
    const notifications = this.notifications();

    return activeFilter === 'all'
      ? notifications
      : notifications.filter((notification) => notification.type === activeFilter);
  });

  protected filterLabel(filter: NotificationFilter): string {
    if (filter === 'ai') {
      return 'AI Analysis';
    }

    if (filter === 'all') {
      return 'All';
    }

    return filter.charAt(0).toUpperCase() + filter.slice(1);
  }

  protected iconBackground(type: NotificationType): string {
    return {
      resume: 'bg-blue-100',
      ai: 'bg-purple-100',
      system: 'bg-amber-100',
      achievement: 'bg-emerald-100',
    }[type];
  }

  protected iconColor(type: NotificationType): string {
    return {
      resume: 'text-blue-600',
      ai: 'text-purple-600',
      system: 'text-amber-600',
      achievement: 'text-emerald-600',
    }[type];
  }
}
