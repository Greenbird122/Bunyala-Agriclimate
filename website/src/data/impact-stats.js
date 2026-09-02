export const impactStats = [
  {
    id: 'waste',
    value: 15,
    suffix: '+',
    labelKey: 'stats.waste_recycled',
    icon: 'Recycle',
    description: 'Tonnes of organic waste targeted/recycled through circular activities',
  },
  {
    id: 'jobs',
    value: 400,
    suffix: '',
    labelKey: 'stats.green_jobs',
    icon: 'Users',
    description: 'Targeted green job opportunities for women and youth',
  },
  {
    id: 'farmers',
    value: 500,
    suffix: '+',
    labelKey: 'stats.farmers_benefiting',
    icon: 'Tractor',
    description: 'Farmers targeted to benefit from climate-smart inputs and training',
  },
  {
    id: 'people',
    value: 10000,
    suffix: '',
    labelKey: 'stats.people_reached',
    icon: 'Globe',
    description: 'Long-term target reached through climate and circular economy initiatives',
  },
  {
    id: 'feed',
    value: 35,
    suffix: '%',
    labelKey: 'stats.feed_cost_reduction',
    icon: 'TrendingDown',
    description: 'Targeted reduction in feed costs through sustainable feed solutions',
  },
];

export const circularImpact = {
  environmental: {
    titleKey: 'impact.environmental',
    itemsKey: 'impact.environmental_items',
    icon: 'TreePine',
    color: 'text-green-600',
  },
  economic: {
    titleKey: 'impact.economic',
    itemsKey: 'impact.economic_items',
    icon: 'TrendingUp',
    color: 'text-blue-600',
  },
  social: {
    titleKey: 'impact.social',
    itemsKey: 'impact.social_items',
    icon: 'Heart',
    color: 'text-purple-600',
  },
};

export default impactStats;
