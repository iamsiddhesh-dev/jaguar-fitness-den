import type { FaqItem } from './types';

/** Frequently asked questions. Seeded from docs/00-business-facts.md. */
export const faqs: FaqItem[] = [
  {
    id: 'meri-mhasrul-locality',
    question: 'Are you close to Meri or Mhasrul?',
    answer:
      "We're located in Panchavati at Floor No. 5, Laxmi Sky Park, on Dindori Road — a short ride from Meri and Mhasrul, and many of our members commute from that side of the city. If you're coming from Meri or Mhasrul, check our directions page for the fastest route in.",
    category: 'location',
  },
  {
    id: 'floor-arrival',
    question: "We're on the 5th floor — how do I get up?",
    answer:
      'Jaguar Fitness Den is on Floor No. 5 of Laxmi Sky Park (Croma Building). The building has lift access to the 5th floor, so you can skip the stairs and head straight to the gym entrance.',
    category: 'location',
  },
  {
    id: 'steam-room',
    question: 'Do you have a steam room?',
    answer:
      'Yes — we have dedicated steam rooms on-site for post-workout recovery, included with your membership.',
    category: 'facilities',
  },
  {
    id: 'parking',
    question: 'Is parking available?',
    answer:
      'Yes, we offer ample, safe parking for members, along with 24/7 CCTV monitoring for added security.',
    category: 'facilities',
  },
  {
    id: 'hours',
    question: 'What are your gym hours?',
    answer:
      'We are open Monday to Saturday from 5:00 AM to 10:30 PM, and Sunday from 8:00 AM to 2:00 PM.',
    category: 'general',
  },
  {
    id: 'membership-cost',
    question: 'How much does membership cost?',
    answer:
      'Our standard annual membership is ₹18,000. We regularly run promotional pricing on the annual plan, so check our pricing page for current offers.',
    category: 'pricing',
  },
];
