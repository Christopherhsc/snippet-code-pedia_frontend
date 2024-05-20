export interface DashboardOverview {
  index: number;
  label: string;
  icon: string;
  dynamicValue: () => any;
  value?: any;
}

export const DASHBOARD_OVERVIEWS: DashboardOverview[] = [
  {
    index: 1,
    label: 'Total Snippets',
    icon: 'text_snippet',
    dynamicValue: () => 'snippets.length || 0',
  },
  {
    index: 2,
    label: 'Total Visitors',
    icon: 'visibility',
    dynamicValue: () => 'totalVisitors',
  },
  {
    index: 3,
    label: 'Total Followers',
    icon: 'group',
    dynamicValue: () => 'Development',
  },
  {
    index: 4,
    label: 'Total Positives',
    icon: 'favorites',
    dynamicValue: () => 'Development',
  },
  {
    index: 5,
    label: 'Total Comments',
    icon: 'notes',
    dynamicValue: () => 'Development',
  },
];
