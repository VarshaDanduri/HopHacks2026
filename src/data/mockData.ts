// Mock data for demonstration purposes

export interface Charity {
  id: string;
  name: string;
  description: string;
  location: string;
  cause: string;
  trustScore: number;
  isTaxDeductible: boolean;
  website: string;
  logo?: string;
  impact?: string;
  founded?: number;
  rating?: number;
}

export interface Donation {
  id: string;
  charityName: string;
  amount: number;
  date: string;
  frequency: string;
  status: 'completed' | 'pending' | 'cancelled';
  isTaxDeductible: boolean;
  taxReceiptSent: boolean;
}

export const mockCharities: Charity[] = [
  {
    id: '1',
    name: 'Doctors Without Borders',
    description: 'International medical humanitarian organization providing emergency medical care worldwide.',
    location: 'New York, NY',
    cause: 'Healthcare',
    trustScore: 94,
    isTaxDeductible: true,
    website: 'https://www.doctorswithoutborders.org',
    impact: 'Serves over 100 countries with emergency medical care',
    founded: 1971,
    rating: 4.8
  },
  {
    id: '2',
    name: 'World Wildlife Fund',
    description: 'Conservation organization working to protect wildlife and their habitats globally.',
    location: 'Washington, DC',
    cause: 'Environment',
    trustScore: 87,
    isTaxDeductible: true,
    website: 'https://www.worldwildlife.org',
    impact: 'Protects over 1,000 species and millions of acres of habitat',
    founded: 1961,
    rating: 4.6
  },
  {
    id: '3',
    name: 'Local Food Bank',
    description: 'Community food bank serving families in need with nutritious meals and groceries.',
    location: 'Chicago, IL',
    cause: 'Hunger Relief',
    trustScore: 78,
    isTaxDeductible: true,
    website: 'https://www.localfoodbank.org',
    impact: 'Feeds over 50,000 families monthly',
    founded: 1985,
    rating: 4.4
  },
  {
    id: '4',
    name: 'Education First Foundation',
    description: 'Supporting educational opportunities for underprivileged children in developing countries.',
    location: 'San Francisco, CA',
    cause: 'Education',
    trustScore: 65,
    isTaxDeductible: false,
    website: 'https://www.educationfirst.org',
    impact: 'Built 200+ schools in 15 countries',
    founded: 1995,
    rating: 4.2
  },
  {
    id: '5',
    name: 'Animal Rescue League',
    description: 'Local animal shelter providing care and adoption services for abandoned pets.',
    location: 'Austin, TX',
    cause: 'Animal Welfare',
    trustScore: 82,
    isTaxDeductible: true,
    website: 'https://www.animalrescueleague.org',
    impact: 'Rescued and rehomed 5,000+ animals annually',
    founded: 1980,
    rating: 4.7
  },
  {
    id: '6',
    name: 'American Red Cross',
    description: 'Emergency relief organization providing disaster response and blood services.',
    location: 'Washington, DC',
    cause: 'Disaster Relief',
    trustScore: 89,
    isTaxDeductible: true,
    website: 'https://www.redcross.org',
    impact: 'Responds to 60,000+ disasters annually',
    founded: 1881,
    rating: 4.5
  },
  {
    id: '7',
    name: 'UNICEF',
    description: 'United Nations agency providing humanitarian aid to children worldwide.',
    location: 'New York, NY',
    cause: 'Children',
    trustScore: 91,
    isTaxDeductible: true,
    website: 'https://www.unicef.org',
    impact: 'Reaches 190+ countries with child protection programs',
    founded: 1946,
    rating: 4.6
  },
  {
    id: '8',
    name: 'Habitat for Humanity',
    description: 'Nonprofit housing organization building and repairing homes for families in need.',
    location: 'Atlanta, GA',
    cause: 'Housing',
    trustScore: 85,
    isTaxDeductible: true,
    website: 'https://www.habitat.org',
    impact: 'Built over 1 million homes worldwide',
    founded: 1976,
    rating: 4.4
  }
];

export const mockDonations: Donation[] = [
  {
    id: '1',
    charityName: 'Doctors Without Borders',
    amount: 100,
    date: '2024-01-15',
    frequency: 'one-time',
    status: 'completed',
    isTaxDeductible: true,
    taxReceiptSent: true
  },
  {
    id: '2',
    charityName: 'World Wildlife Fund',
    amount: 50,
    date: '2024-01-01',
    frequency: 'monthly',
    status: 'completed',
    isTaxDeductible: true,
    taxReceiptSent: true
  },
  {
    id: '3',
    charityName: 'Local Food Bank',
    amount: 75,
    date: '2024-01-10',
    frequency: 'one-time',
    status: 'completed',
    isTaxDeductible: true,
    taxReceiptSent: false
  },
  {
    id: '4',
    charityName: 'American Red Cross',
    amount: 200,
    date: '2023-12-20',
    frequency: 'one-time',
    status: 'completed',
    isTaxDeductible: true,
    taxReceiptSent: true
  }
];

export const causes = [
  'All',
  'Healthcare',
  'Environment',
  'Hunger Relief',
  'Education',
  'Animal Welfare',
  'Disaster Relief',
  'Children',
  'Housing',
  'Human Rights'
];

export const locations = [
  'All',
  'New York, NY',
  'Washington, DC',
  'Chicago, IL',
  'San Francisco, CA',
  'Austin, TX',
  'Los Angeles, CA',
  'Boston, MA',
  'Atlanta, GA',
  'Seattle, WA'
];
