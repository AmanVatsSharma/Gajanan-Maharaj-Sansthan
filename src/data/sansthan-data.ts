export interface Facility {
  name: string;
  type: 'Room' | 'Dormitory' | 'Hall';
  ac: boolean;
  capacity: number;
}

export interface Location {
  id: string;
  name: string;
  city: string;
  address: string;
  description: string;
  facilities: Facility[];
  amenities: string[];
  contact: string[];
  images: string[];
  googleMapsLink?: string;
}

export interface SansthanRule {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

import { CONTACT_DETAILS } from "@/data/contact";

export const sansthanLocations: Location[] = [
  {
    id: 'shegaon-bhakt-niwas',
    name: 'Bhakt Niwas Complex (1-6)',
    city: 'Shegaon',
    address: 'Near Shri Gajanan Maharaj Temple, Shegaon, Dist. Buldhana',
    description: 'The main accommodation complex for devotees visiting the holy samadhi. Includes multiple buildings with various room types.',
    facilities: [
      { name: 'Common Hall', type: 'Dormitory', ac: false, capacity: 50 },
      { name: 'Double Bed', type: 'Room', ac: false, capacity: 3 },
      { name: 'Deluxe Room', type: 'Room', ac: true, capacity: 3 },
    ],
    amenities: ['Hot Water (Morning)', 'Mahaprasad Canteen', 'Free Bus Service', 'Parking'],
    contact: [CONTACT_DETAILS.locations.shegaon.bhaktaNiwas, CONTACT_DETAILS.locations.shegaon.mandir],
    images: ['/images/shegaon-temple.jpg'],
  },
  {
    id: 'shegaon-anand-vihar',
    name: 'Anand Vihar',
    city: 'Shegaon',
    address: 'Near Anand Sagar, Shegaon',
    description: 'A premium accommodation complex located near the Anand Sagar spiritual park.',
    facilities: [
      { name: 'AC Room', type: 'Room', ac: true, capacity: 3 },
      { name: 'Suite', type: 'Room', ac: true, capacity: 4 },
    ],
    amenities: ['AC', 'Garden', 'Canteen', 'Parking'],
    contact: [CONTACT_DETAILS.locations.shegaon.anandVihar],
    images: ['/images/anand-sagar.jpg'],
  },
  {
    id: 'shegaon-visawa',
    name: 'Visawa',
    city: 'Shegaon',
    address: 'Near Railway Station / Anand Sagar Road, Shegaon',
    description: 'Conveniently located accommodation for travelers arriving by train.',
    facilities: [
      { name: 'Standard Room', type: 'Room', ac: false, capacity: 3 },
    ],
    amenities: ['Parking', 'Canteen'],
    contact: [CONTACT_DETAILS.locations.shegaon.visawa],
    images: ['/images/shegaon-temple.jpg'],
  },
  {
    id: 'pandharpur-math',
    name: 'Shri Gajanan Maharaj Math',
    city: 'Pandharpur',
    address: 'Near Sant Kaikadi Maharaj Math, Pandharpur',
    description: 'A large complex serving pilgrims visiting Lord Vitthal.',
    facilities: [
      { name: 'Room', type: 'Room', ac: false, capacity: 4 },
      { name: 'Hall', type: 'Hall', ac: false, capacity: 20 },
    ],
    amenities: ['Bhojan Kaksha', 'Hot Water'],
    contact: [],
    images: ['/images/pandharpur.jpg'],
  },
  {
    id: 'trimbakeshwar',
    name: 'Shri Gajanan Maharaj Sansthan Branch',
    city: 'Trimbakeshwar',
    address: 'Trimbakeshwar, Dist. Nashik',
    description: 'Accommodation for devotees visiting the Trimbakeshwar Jyotirlinga.',
    facilities: [
      { name: 'Room', type: 'Room', ac: false, capacity: 3 },
    ],
    amenities: [],
    contact: [],
    images: ['/images/trimbakeshwar.jpg'],
  },
  {
    id: 'omkareshwar',
    name: 'Shri Gajanan Maharaj Bhakta Niwas',
    city: 'Omkareshwar',
    address: 'Omkareshwar, Madhya Pradesh',
    description: 'Serving pilgrims visiting Omkareshwar Jyotirlinga.',
    facilities: [
      { name: 'Room', type: 'Room', ac: false, capacity: 3 },
    ],
    amenities: [],
    contact: [],
    images: ['/images/omkareshwar.jpg'],
  },
];

export const bookingRules: SansthanRule[] = [
  {
    id: 'family-only',
    title: 'Families Only',
    description: 'Rooms are strictly allocated to families only. Single persons or groups of friends may be directed to dormitories.',
  },
  {
    id: 'min-occupancy',
    title: 'Minimum Occupancy',
    description: 'A minimum of 3 family members is often required to book a private room.',
  },
  {
    id: 'id-proof',
    title: 'Valid ID Proof',
    description: 'Government issued ID (Aadhar/Voter ID) is mandatory for all guests.',
  },
  {
    id: 'married-couples',
    title: 'Married Couples',
    description: 'Unmarried couples are strictly not allowed. Proof of marriage may be requested.',
  },
  {
    id: 'check-in',
    title: '24-Hour Check-in',
    description: 'Accommodation is usually allotted for 24 hours from the time of check-in.',
  },
];

export const sansthanHistory = {
  title: 'Shri Gajanan Maharaj Sansthan',
  description: 'Shri Gajanan Maharaj Sansthan, Shegaon is a trust formed in 1908 by the devotees of Shri Gajanan Maharaj to serve humanity and propagate his teachings. The Sansthan is known for its disciplined management, cleanliness, and various social welfare activities including medical camps, education, and free food distribution (Mahaprasad).',
  motto: 'Gan Gan Ganaat Bote',
};
