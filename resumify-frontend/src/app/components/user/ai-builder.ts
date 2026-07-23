import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Navbar } from '../shared/navbar';

type SectionKey =
  | 'personal'
  | 'summary'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'achievements'
  | 'languages'
  | 'education';

const suggestions = [
  'Led cross-functional team of 8 engineers to deliver product 2 weeks ahead of schedule',
  'Increased user retention by 34% through A/B tested onboarding improvements',
  'Reduced page load time by 60% via lazy loading and CDN optimisations',
  'Managed $2.4M product roadmap aligning with OKRs across 3 business units',
];

const skillOptions = [
  'Product Strategy',
  'Figma',
  'User Research',
  'Data Analysis',
  'React',
  'TypeScript',
  'Agile / Scrum',
  'SQL',
  'Stakeholder Management',
  'A/B Testing',
];

@Component({
  selector: 'app-ai-builder',
  standalone: true,
  imports: [FormsModule, Navbar],
  templateUrl: './ai-builder.html',
})
export class AiBuilder {
  private readonly route = inject(ActivatedRoute);

  protected readonly template = signal(this.route.snapshot.paramMap.get('template') ?? 'classic');
  protected readonly previewMode = signal(false);
  protected readonly aiLoading = signal(false);
  protected readonly activePrompt = signal<string | number | null>(null);
  protected readonly selectedSkills = signal(['Figma', 'Product Strategy', 'User Research']);
  protected readonly openSections = signal<Record<SectionKey, boolean>>({
    personal: true,
    summary: false,
    skills: false,
    experience: false,
    projects: false,
    achievements: false,
    languages: false,
    education: false,
  });

  protected readonly suggestions = suggestions;
  protected readonly skillOptions = skillOptions;
  protected readonly skillRows = [
    { cat: 'Frontend', val: 'Angular (12-18), TypeScript, JavaScript, RxJS, HTML, SCSS' },
    { cat: 'UI Libraries', val: 'Angular Material, DevExtreme, Bootstrap, ApexCharts' },
    { cat: 'Backend', val: 'Node.js, Express.js, .NET Core Web API (Basic Knowledge)' },
    { cat: 'Database', val: 'MongoDB, MySQL (Basic Knowledge)' },
    { cat: 'Tools', val: 'REST APIs, Swagger, Git, GitHub, Postman, VS Code' },
  ];
  protected readonly experiences = [
    {
      company: 'Torrent Pharmaceuticals Ltd.',
      role: 'Executive - Frontend Developer (Angular)',
      location: 'Ahmedabad, Gujarat',
      start: 'March 2024',
      end: 'Present',
    },
    {
      company: 'Ambroasian Research & Development Pvt. Ltd.',
      role: 'Angular Frontend Developer',
      location: 'Pune, Maharashtra',
      start: 'December 2021',
      end: 'March 2024',
    },
  ];
  protected readonly projects = [
    {
      name: 'Sales Force Automation (SFA) Platform',
      tech: 'Angular, DevExtreme, ApexCharts',
      start: 'March 2024',
      end: 'Present',
    },
    {
      name: 'Hotel Management & Monitoring Platform',
      tech: 'Angular, Bootstrap',
      start: 'Dec 2021',
      end: 'March 2024',
    },
  ];
  protected readonly achievements = [
    'Built and delivered 25+ reports and dashboards used across multiple pharma divisions.',
    'Implemented approval workflows that streamlined expense, vehicle, and compliance processes.',
    'Improved application performance by optimizing API calls and lazy loading.',
    'Delivered business-critical modules used by field staff, improving reporting accuracy.',
  ];
  protected readonly languages = [
    { lang: 'English', level: 'Professional' },
    { lang: 'Hindi', level: 'Native' },
    { lang: 'Marathi', level: 'Native' },
  ];
  protected readonly education = [
    {
      degree: 'Master of Science in Bio-Informatics',
      school: 'SRTM University',
      start: '2016',
      end: '2018',
    },
    {
      degree: 'Bachelor of Science in Bio-Informatics',
      school: 'SRTM University',
      start: '2013',
      end: '2016',
    },
  ];
  protected readonly headerBg = computed(() =>
    this.template() === 'modern' ? '#0F172A' : '#1B2B5E',
  );
  protected readonly accent = computed(() =>
    this.template() === 'modern'
      ? '#6366F1'
      : this.template() === 'classic'
        ? '#DC2626'
        : '#C9902A',
  );

  protected toggleSection(section: SectionKey | string): void {
    const key = section as SectionKey;

    this.openSections.update((sections) => {
      const isCurrentlyOpen = sections[key];

      // Close all sections and toggle only the clicked one
      return {
        personal: false,
        summary: false,
        skills: false,
        experience: false,
        projects: false,
        achievements: false,
        languages: false,
        education: false,

        [key]: !isCurrentlyOpen,
      };
    });
  }

  protected sectionOpen(section: SectionKey | string): boolean {
    return this.openSections()[section as SectionKey];
  }

  protected togglePreview(): void {
    this.previewMode.update((value) => !value);
  }

  protected toggleSkill(skill: string): void {
    this.selectedSkills.update((skills) =>
      skills.includes(skill) ? skills.filter((item) => item !== skill) : [...skills, skill],
    );
  }

  protected triggerAI(id: number | string): void {
    this.aiLoading.set(true);
    this.activePrompt.set(id);
    window.setTimeout(() => this.aiLoading.set(false), 1500);
  }

  protected aiButtonClass(id: number | string): string {
    const active = this.activePrompt() === id;

    if (active && this.aiLoading()) {
      return 'border-accent/40 bg-accent/5 text-accent cursor-wait';
    }

    if (active && !this.aiLoading()) {
      return 'border-emerald-300 bg-emerald-50 text-emerald-700';
    }

    return 'border-border text-accent hover:bg-accent/5 hover:border-accent/40';
  }

  protected aiButtonLabel(id: number | string, label: string): string {
    const active = this.activePrompt() === id;

    if (active && this.aiLoading()) {
      return 'Rewriting...';
    }

    if (active && !this.aiLoading()) {
      return 'Done! Review above';
    }

    return label;
  }
}
