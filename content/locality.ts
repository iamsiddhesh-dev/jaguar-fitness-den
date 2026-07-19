import type { LocalityContent } from './types';

/**
 * Content for the /gym-near-meri-mhasrul locality landing page. Secondary-locality
 * SEO target per docs/05-TRD.md — substantive unique content, never a second NAP.
 * Travel times are rider estimates for normal daytime traffic, not GPS-measured.
 */
export const meriMhasrulLocality: LocalityContent = {
  slug: 'gym-near-meri-mhasrul',
  areaName: 'Meri & Mhasrul',
  intro:
    "If you're training-curious on the Meri or Mhasrul side of Nashik, Jaguar Fitness Den is closer than most people assume — a short, direct ride down Dindori Road, not a cross-city trek.",
  routes: [
    {
      from: 'Meri',
      approxDistanceKm: '~4–5 km',
      approxTravelTime: '~10–15 min by bike or car',
      directions:
        'Head onto Dindori Road and stay on it — you’ll pass Jio Petrol Pump on your approach. Laxmi Sky Park (Croma Building) is right there; Jaguar Fitness Den is on Floor No. 5.',
    },
    {
      from: 'Mhasrul',
      approxDistanceKm: '~3–4 km',
      approxTravelTime: '~10–12 min by bike or car',
      directions:
        'Join Dindori Road heading toward Panchavati. Keep going until you reach Jio Petrol Pump and the Croma Building (Laxmi Sky Park) on your right — take the lift to Floor No. 5.',
    },
  ],
  whyWorthIt: [
    {
      title: 'A genuinely bigger facility',
      description:
        '5,500+ sq ft across a dedicated floor — international-grade Jaguar Strength equipment, separate group-class studios for Zumba, Yoga and Functional Training, and space that never feels crowded at peak hours.',
    },
    {
      title: 'Recovery, not just reps',
      description:
        'Steam rooms and a members’ lounge are built into the membership, not sold as an upsell — the kind of amenities most budget gyms in the area simply don’t have room for.',
    },
    {
      title: 'Training you can actually track',
      description:
        'The members app logs workouts, diet, and body stats from your phone, so the short ride down Dindori Road comes with a coaching layer most nearby options don’t offer at all.',
    },
    {
      title: 'One price, everything included',
      description:
        'Fully air-conditioned interiors, secure lockers, ample parking, and 24/7 CCTV are part of the same membership — no separate add-on fees for the basics.',
    },
  ],
  seo: {
    title: 'Gym Near Meri & Mhasrul, Nashik | Jaguar Fitness Den',
    description:
      'Premium gym near Meri & Mhasrul, Nashik — Jaguar Fitness Den is a short ride down Dindori Road, Panchavati. 5,500+ sq ft, steam rooms, and a members app.',
  },
};
