import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login-screen').then((component) => component.LoginScreen),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/auth/register-screen').then((component) => component.RegisterScreen),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/user/user-dashboard').then((component) => component.UserDashboard),
  },
  {
    path: 'templates',
    loadComponent: () =>
      import('./components/user/template-selection').then((component) => component.TemplateSelection),
  },
  {
    path: 'ai-builder',
    redirectTo: 'ai-builder/classic',
    pathMatch: 'full',
  },
  {
    path: 'ai-builder/:template',
    loadComponent: () =>
      import('./components/user/ai-builder').then((component) => component.AiBuilder),
  },
  {
    path: 'admin/dashboard',
    loadComponent: () =>
      import('./components/admin/admin-dashboard').then((component) => component.AdminDashboard),
  },
  {
    path: 'admin/templates',
    loadComponent: () =>
      import('./components/admin/template-management').then((component) => component.TemplateManagement),
  },
  {
    path: 'admin/users',
    loadComponent: () =>
      import('./components/admin/user-tracking').then((component) => component.UserTracking),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
