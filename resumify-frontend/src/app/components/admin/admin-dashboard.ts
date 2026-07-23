import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { screenPath } from '../../screens';
import { Navbar } from '../shared/navbar';

const areaData = [
  { month: 'Jan', resumes: 820, users: 340 },
  { month: 'Feb', resumes: 1100, users: 480 },
  { month: 'Mar', resumes: 960, users: 420 },
  { month: 'Apr', resumes: 1340, users: 590 },
  { month: 'May', resumes: 1580, users: 680 },
  { month: 'Jun', resumes: 1720, users: 740 },
  { month: 'Jul', resumes: 2050, users: 890 },
];

const barData = [
  { template: 'Executive', uses: 4230 },
  { template: 'Modern', uses: 3180 },
  { template: 'Classic', uses: 6740 },
  { template: 'Minimal', uses: 2190 },
  { template: 'Impact', uses: 1650 },
];

const pieData = [
  { name: 'Tech', value: 38, color: '#6366F1' },
  { name: 'Finance', value: 22, color: '#C9902A' },
  { name: 'Healthcare', value: 15, color: '#10B981' },
  { name: 'Creative', value: 14, color: '#F43F5E' },
  { name: 'Other', value: 11, color: '#94A3B8' },
];

const recentActivity = [
  {
    user: 'Emma Chen',
    action: 'Generated resume',
    template: 'Executive',
    time: '2 min ago',
    avatar: 'EC',
  },
  {
    user: 'Marcus Williams',
    action: 'Uploaded for analysis',
    template: '-',
    time: '8 min ago',
    avatar: 'MW',
  },
  {
    user: 'Priya Sharma',
    action: 'Downloaded PDF',
    template: 'Modern',
    time: '14 min ago',
    avatar: 'PS',
  },
  {
    user: 'Luca Ferreira',
    action: 'Registered account',
    template: '-',
    time: '21 min ago',
    avatar: 'LF',
  },
  {
    user: 'Aisha Johnson',
    action: 'Generated resume',
    template: 'Minimal',
    time: '35 min ago',
    avatar: 'AJ',
  },
];

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [Navbar, NgApexchartsModule],
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboard {
  private readonly router = inject(Router);

  protected readonly kpis = [
    {
      icon: 'users',
      label: 'Total Users',
      value: '52,841',
      delta: '+12.4%',
      up: true,
      sub: 'vs. last month',
    },
    {
      icon: 'file',
      label: 'Resumes Generated',
      value: '187,320',
      delta: '+8.7%',
      up: true,
      sub: 'all time',
    },
    {
      icon: 'activity',
      label: 'Active Sessions',
      value: '1,248',
      delta: '-3.2%',
      up: false,
      sub: 'right now',
    },
    {
      icon: 'trend',
      label: 'Avg. AI Score',
      value: '73.4',
      delta: '+2.1 pts',
      up: true,
      sub: 'across all resumes',
    },
  ];
  protected readonly areaData = areaData;
  protected readonly barData = barData;
  protected readonly pieData = pieData;
  protected readonly recentActivity = recentActivity;
  protected readonly growthSeries: ApexAxisChartSeries = [
    { name: 'Resumes Generated', data: areaData.map((item) => item.resumes) },
    { name: 'New Users', data: areaData.map((item) => item.users) },
  ];
  protected readonly growthChart: ApexChart = {
    type: 'area',
    height: 245,
    toolbar: { show: false },
    zoom: { enabled: false },
    fontFamily: 'DM Sans, system-ui, sans-serif',
    animations: {
      enabled: true,
      speed: 700,
      dynamicAnimation: { enabled: true, speed: 350 },
    },
  };
  protected readonly growthColors = ['#1B2B5E', '#C9902A'];
  protected readonly growthStroke: ApexStroke = {
    curve: 'smooth',
    width: 3,
    lineCap: 'round',
  };
  protected readonly growthFill: ApexFill = {
    type: 'gradient',
    gradient: {
      shadeIntensity: 0.9,
      opacityFrom: 0.24,
      opacityTo: 0.04,
      stops: [0, 85, 100],
    },
  };
  protected readonly growthXAxis: ApexXAxis = {
    categories: areaData.map((item) => item.month),
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: '#6B7280', fontSize: '11px' } },
    tooltip: { enabled: false },
  };
  protected readonly growthYAxis: ApexYAxis = {
    labels: {
      style: { colors: '#6B7280', fontSize: '11px' },
      formatter: (value: number) => value.toLocaleString(),
    },
  };
  protected readonly growthGrid: ApexGrid = {
    borderColor: '#E4E7EE',
    strokeDashArray: 4,
    padding: { left: 4, right: 14, top: 0, bottom: 0 },
  };
  protected readonly growthTooltip: ApexTooltip = {
    shared: true,
    intersect: false,
    marker: { show: true },
    y: { formatter: (value: number) => value.toLocaleString() },
  };
  protected readonly growthLegend: ApexLegend = {
    position: 'top',
    horizontalAlign: 'right',
    fontSize: '12px',
    labels: { colors: '#6B7280' },
    markers: { size: 6, strokeWidth: 0 },
  };
  protected readonly chartDataLabels: ApexDataLabels = { enabled: false };

  protected readonly industrySeries: ApexNonAxisChartSeries = pieData.map((item) => item.value);
  protected readonly industryLabels = pieData.map((item) => item.name);
  protected readonly industryColors = pieData.map((item) => item.color);
  protected readonly industryChart: ApexChart = {
    type: 'donut',
    height: 230,
    fontFamily: 'DM Sans, system-ui, sans-serif',
  };
  protected readonly industryPlotOptions: ApexPlotOptions = {
    pie: {
      donut: {
        size: '68%',
        labels: {
          show: true,
          name: { show: true, color: '#6B7280', fontSize: '12px' },
          value: {
            show: true,
            color: '#111827',
            fontSize: '22px',
            fontWeight: 700,
            formatter: (value: string) => `${value}%`,
          },
          total: {
            show: true,
            label: 'Sectors',
            color: '#6B7280',
            fontSize: '12px',
            formatter: () => `${pieData.length}`,
          },
        },
      },
    },
  };
  protected readonly industryLegend: ApexLegend = { show: false };
  protected readonly industryTooltip: ApexTooltip = {
    y: { formatter: (value: number) => `${value}% of users` },
  };
  protected readonly industryResponsive: ApexResponsive[] = [
    {
      breakpoint: 640,
      options: {
        chart: { height: 210 },
      },
    },
  ];

  protected readonly templateSeries: ApexAxisChartSeries = [
    { name: 'Uses', data: barData.map((item) => item.uses) },
  ];
  protected readonly templateChart: ApexChart = {
    type: 'bar',
    height: 225,
    toolbar: { show: false },
    fontFamily: 'DM Sans, system-ui, sans-serif',
  };
  protected readonly templatePlotOptions: ApexPlotOptions = {
    bar: {
      borderRadius: 6,
      columnWidth: '46%',
      distributed: true,
      dataLabels: { position: 'top' },
    },
  };
  protected readonly templateColors = ['#1B2B5E', '#324A84', '#C9902A', '#10B981', '#F43F5E'];
  protected readonly templateXAxis: ApexXAxis = {
    categories: barData.map((item) => item.template),
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: '#6B7280', fontSize: '11px' } },
  };
  protected readonly templateYAxis: ApexYAxis = {
    labels: {
      style: { colors: '#6B7280', fontSize: '11px' },
      formatter: (value: number) => `${Math.round(value / 100) / 10}k`,
    },
  };
  protected readonly templateGrid: ApexGrid = {
    borderColor: '#E4E7EE',
    strokeDashArray: 4,
    padding: { left: 4, right: 8, top: 0, bottom: 0 },
  };
  protected readonly templateTooltip: ApexTooltip = {
    y: { formatter: (value: number) => `${value.toLocaleString()} uses` },
  };
  protected readonly templateLegend: ApexLegend = { show: false };

  protected viewUsers(): void {
    void this.router.navigateByUrl(screenPath('admin-users'));
  }
}
