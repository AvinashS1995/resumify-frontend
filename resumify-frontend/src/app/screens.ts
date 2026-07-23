export type Screen =
  | 'login'
  | 'register'
  | 'user-dashboard'
  | 'template-selection'
  | 'ai-builder'
  | 'admin-dashboard'
  | 'admin-templates'
  | 'admin-users';

export function screenPath(screen: Screen): string {
  return {
    login: '/login',
    register: '/register',
    'user-dashboard': '/dashboard',
    'template-selection': '/templates',
    'ai-builder': '/ai-builder/classic',
    'admin-dashboard': '/admin/dashboard',
    'admin-templates': '/admin/templates',
    'admin-users': '/admin/users',
  }[screen];
}
