import { Component, computed, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AdminSidebar } from '../shared/admin-sidebar';
import { Navbar } from '../shared/navbar';

type TemplateFilter = 'all' | 'enabled' | 'disabled';

interface ResumeTemplate {
  id: string;
  name: string;
  category: string;
  enabled: boolean;
  uses: number;
  rating: number;
  uploadedAt: string;
  uploadedBy: string;
  headerBg: string;
  accent: string;
}

const initialTemplates: ResumeTemplate[] = [
  {
    id: 'executive',
    name: 'Executive',
    category: 'Corporate',
    enabled: true,
    uses: 4230,
    rating: 4.9,
    uploadedAt: 'Mar 12, 2026',
    uploadedBy: 'Admin',
    headerBg: '#1B2B5E',
    accent: '#C9902A',
  },
  {
    id: 'modern',
    name: 'Modern',
    category: 'Tech',
    enabled: true,
    uses: 3180,
    rating: 4.8,
    uploadedAt: 'Feb 4, 2026',
    uploadedBy: 'Admin',
    headerBg: '#0F172A',
    accent: '#6366F1',
  },
  {
    id: 'classic',
    name: 'Classic',
    category: 'Traditional',
    enabled: true,
    uses: 6740,
    rating: 4.7,
    uploadedAt: 'Jan 8, 2026',
    uploadedBy: 'Admin',
    headerBg: '#FFFFFF',
    accent: '#DC2626',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    category: 'Creative',
    enabled: true,
    uses: 2190,
    rating: 4.6,
    uploadedAt: 'Apr 20, 2026',
    uploadedBy: 'Admin',
    headerBg: '#FAFAFA',
    accent: '#10B981',
  },
  {
    id: 'impact',
    name: 'Impact',
    category: 'Bold',
    enabled: false,
    uses: 1650,
    rating: 4.5,
    uploadedAt: 'Jun 1, 2026',
    uploadedBy: 'Admin',
    headerBg: '#18181B',
    accent: '#F59E0B',
  },
  {
    id: 'collegiate',
    name: 'Collegiate',
    category: 'Academic',
    enabled: false,
    uses: 4300,
    rating: 4.4,
    uploadedAt: 'May 15, 2026',
    uploadedBy: 'Admin',
    headerBg: '#1E3A5F',
    accent: '#C41E3A',
  },
];

@Component({
  selector: 'app-template-management',
  standalone: true,
  imports: [Navbar, NgTemplateOutlet],
  templateUrl: './template-management.html',
})
export class TemplateManagement {
  protected readonly templates = signal<ResumeTemplate[]>(initialTemplates);
  protected readonly search = signal('');
  protected readonly filter = signal<TemplateFilter>('all');
  protected readonly preview = signal<string | null>(null);
  protected readonly showUpload = signal(false);
  protected readonly filters: TemplateFilter[] = ['all', 'enabled', 'disabled'];
  protected readonly filtered = computed(() => {
    const query = this.search().toLowerCase();
    const filter = this.filter();
    return this.templates().filter(
      (template) =>
        template.name.toLowerCase().includes(query) &&
        (filter === 'all' || (filter === 'enabled' ? template.enabled : !template.enabled)),
    );
  });
  protected readonly activeCount = computed(
    () => this.templates().filter((template) => template.enabled).length,
  );
  protected readonly disabledCount = computed(
    () => this.templates().filter((template) => !template.enabled).length,
  );
  protected readonly previewTemplate = computed(() =>
    this.templates().find((template) => template.id === this.preview()),
  );

  protected setSearch(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
  }

  protected setFilter(filter: TemplateFilter): void {
    this.filter.set(filter);
  }

  protected toggle(id: string): void {
    this.templates.update((templates) =>
      templates.map((template) =>
        template.id === id ? { ...template, enabled: !template.enabled } : template,
      ),
    );
  }

  protected remove(id: string): void {
    this.templates.update((templates) => templates.filter((template) => template.id !== id));
  }

  protected textColor(headerBg: string): string {
    return headerBg === '#FFFFFF' || headerBg === '#FAFAFA' ? '#111827' : '#FFFFFF';
  }
}
