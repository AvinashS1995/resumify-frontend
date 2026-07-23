export type NotificationType = 'resume' | 'ai' | 'system' | 'achievement';

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  body: string;
  time: string;
  read: boolean;
}
