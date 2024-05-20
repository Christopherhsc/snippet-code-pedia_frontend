export interface DashboardOverview {
    index: number;
    label: string;
    icon: string;
    value: string;
  }
  
  export const DASHBOARD_OVERVIEWS: DashboardOverview[] = [
    {
      index: 1,
      label: 'Total Snippets',
      icon: 'text_snippet',
      value: 'snippets.length || 0',
    },
    {
      index: 2,
      label: 'Total Visitors',
      icon: 'visibility',
      value: 'totalVisitors',
    },
    {
      index: 3,
      label: 'Total Followers',
      icon: 'group',
      value: 'Development',
    },
    {
      index: 4,
      label: 'Total Positives',
      icon: 'favorites',
      value: 'Development',
    },
    {
      index: 5,
      label: 'Total Comments',
      icon: 'notes',
      value: 'Development',
    },
  ];