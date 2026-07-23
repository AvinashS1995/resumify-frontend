import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Navbar } from '../shared/navbar';

interface ResumeTemplate {
  id: string;
  name: string;
  category: string;
  rating: number;
  uses: string;
  colors: string[];
  badge: string | null;
  preview: {
    headerBg: string;
    headerText: string;
    accent: string;
  };
}

const templates: ResumeTemplate[] = [
  {
    id: 'executive',
    name: 'Executive',
    category: 'Corporate',
    rating: 4.9,
    uses: '12.4k',
    colors: ['#1B2B5E', '#FFFFFF', '#C9902A'],
    badge: 'Top Pick',
    preview: { headerBg: '#1B2B5E', headerText: '#FFFFFF', accent: '#C9902A' },
  },
  {
    id: 'modern',
    name: 'Modern',
    category: 'Tech',
    rating: 4.8,
    uses: '9.1k',
    colors: ['#0F172A', '#F8FAFC', '#6366F1'],
    badge: 'Trending',
    preview: { headerBg: '#0F172A', headerText: '#FFFFFF', accent: '#6366F1' },
  },
  {
    id: 'classic',
    name: 'Classic',
    category: 'Traditional',
    rating: 4.7,
    uses: '23.8k',
    colors: ['#FFFFFF', '#111827', '#DC2626'],
    badge: 'Most Used',
    preview: { headerBg: '#FFFFFF', headerText: '#111827', accent: '#DC2626' },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    category: 'Creative',
    rating: 4.6,
    uses: '7.2k',
    colors: ['#FAFAFA', '#374151', '#10B981'],
    badge: null,
    preview: { headerBg: '#FAFAFA', headerText: '#374151', accent: '#10B981' },
  },
  {
    id: 'impact',
    name: 'Impact',
    category: 'Bold',
    rating: 4.5,
    uses: '5.8k',
    colors: ['#18181B', '#FAFAFA', '#F59E0B'],
    badge: 'New',
    preview: { headerBg: '#18181B', headerText: '#FFFFFF', accent: '#F59E0B' },
  },
  {
    id: 'collegiate',
    name: 'Collegiate',
    category: 'Academic',
    rating: 4.4,
    uses: '4.3k',
    colors: ['#FFFFFF', '#1E3A5F', '#C41E3A'],
    badge: null,
    preview: { headerBg: '#1E3A5F', headerText: '#FFFFFF', accent: '#C41E3A' },
  },
];

const categories = ['All', 'Corporate', 'Tech', 'Traditional', 'Creative', 'Academic'];

@Component({
  selector: 'app-template-selection',
  standalone: true,
  imports: [FormsModule, Navbar],
  templateUrl: './template-selection.html',
})
export class TemplateSelection {
  private readonly router = inject(Router);

  protected readonly selected = signal('classic');
  protected readonly activeCategory = signal('All');
  protected readonly templates = templates;
  protected readonly categories = categories;
  protected search = '';
  protected filteredTemplates(): ResumeTemplate[] {
    return this.templates.filter(
      (template) =>
        (this.activeCategory() === 'All' || template.category === this.activeCategory()) &&
        template.name.toLowerCase().includes(this.search.toLowerCase()),
    );
  }

  protected badgeClass(badge: string): string {
    return {
      'Top Pick': 'bg-amber-100 text-amber-700',
      Trending: 'bg-purple-100 text-purple-700',
      'Most Used': 'bg-blue-100 text-blue-700',
      New: 'bg-emerald-100 text-emerald-700',
    }[badge] ?? 'bg-muted text-muted-foreground';
  }

  protected chooseTemplate(template: string): void {
    this.selected.set(template);
    void this.router.navigate(['/ai-builder', template]);
  }
}
