import type { Program } from './types';

/** The 6 core programs offered at Jaguar Fitness Den. Seeded from docs/00-business-facts.md. */
export const programs: Program[] = [
  {
    slug: 'strength',
    name: 'Strength Training',
    tagline: 'Build real, lasting strength on international-grade equipment.',
    description:
      'Structured strength training on Jaguar Strength commercial machinery and free weights, built around progressive overload so every session moves you forward.',
    whoItsFor:
      'Anyone who wants a serious, structured strength program — beginners to experienced lifters.',
    sessionStructure: [
      'Warm-up and mobility prep',
      'Compound lifts (squat, press, pull, hinge patterns)',
      'Accessory and isolation work',
      'Guided cool-down and form check-in',
    ],
    seo: {
      title: 'Strength Training in Panchavati, Nashik | Jaguar Fitness Den',
      description:
        'Premium strength training on international-grade Jaguar Strength equipment at Jaguar Fitness Den, Panchavati, Nashik. Structured programs for all levels.',
    },
  },
  {
    slug: 'functional',
    name: 'Functional Training',
    tagline: 'Train movement, not just muscle.',
    description:
      'Full-body functional training in a dedicated studio — circuits, kettlebells, and bodyweight patterns designed to build strength that carries into everyday life.',
    whoItsFor:
      'Members who want varied, high-energy full-body workouts and better everyday movement.',
    sessionStructure: [
      'Dynamic warm-up',
      'Circuit-based functional movements',
      'Core and stability finisher',
      'Stretch and recovery',
    ],
    seo: {
      title: 'Functional Training Studio in Panchavati, Nashik | Jaguar Fitness Den',
      description:
        'Dedicated functional training studio at Jaguar Fitness Den, Panchavati, Nashik. Full-body circuits for strength, mobility, and everyday performance.',
    },
  },
  {
    slug: 'zumba',
    name: 'Zumba',
    tagline: 'Dance-fitness that never feels like a workout.',
    description:
      'High-energy Zumba classes in our dedicated group studio, blending dance choreography with cardio conditioning for a full-body calorie burn.',
    whoItsFor: 'Members who want a fun, social, music-driven cardio workout.',
    sessionStructure: [
      'Warm-up choreography',
      'High-intensity dance intervals',
      'Low-intensity active recovery segments',
      'Cool-down stretch',
    ],
    seo: {
      title: 'Zumba Classes in Panchavati, Nashik | Jaguar Fitness Den',
      description:
        'Join high-energy Zumba classes at Jaguar Fitness Den, Panchavati, Nashik — dance-fitness cardio in a dedicated group studio.',
    },
  },
  {
    slug: 'yoga',
    name: 'Yoga',
    tagline: 'Balance strength training with breath and flexibility.',
    description:
      'Guided yoga sessions in a dedicated studio focused on flexibility, breathing, and recovery — a complement to strength and functional training.',
    whoItsFor:
      'Members seeking flexibility, stress relief, and active recovery alongside their training.',
    sessionStructure: [
      'Breathing and centering',
      'Asana sequence (strength and flexibility flow)',
      'Balance and mobility work',
      'Guided relaxation',
    ],
    seo: {
      title: 'Yoga Classes in Panchavati, Nashik | Jaguar Fitness Den',
      description:
        'Dedicated yoga studio at Jaguar Fitness Den, Panchavati, Nashik. Build flexibility, balance, and recovery alongside your training program.',
    },
  },
  {
    slug: 'personal-training',
    name: 'Personal Training',
    tagline: 'One-on-one coaching from certified, elite trainers.',
    description:
      'Personalized coaching with certified personal trainers — tailored programming, form correction, and accountability to hit your specific goals faster.',
    whoItsFor:
      'Members who want individualized attention, faster results, or help getting started safely.',
    sessionStructure: [
      'Goal and fitness assessment',
      'Personalized program design',
      'One-on-one coached session',
      'Progress tracking via the members app',
    ],
    seo: {
      title: 'Personal Training in Panchavati, Nashik | Jaguar Fitness Den',
      description:
        'One-on-one personal training with certified, elite trainers at Jaguar Fitness Den, Panchavati, Nashik. Tailored programs, faster results.',
    },
  },
  {
    slug: 'nutrition-coaching',
    name: 'Nutrition Coaching',
    tagline: 'Expert nutrition guidance to match your training.',
    description:
      'Nutrition coaching from our in-house experts, paired with the members app for diet and body-stat tracking — so your eating supports your training, not the other way around.',
    whoItsFor: 'Members who want structured diet guidance alongside their workout program.',
    sessionStructure: [
      'Initial nutrition and lifestyle assessment',
      'Personalized diet plan',
      'Ongoing check-ins via the members app',
      'Plan adjustments based on progress',
    ],
    seo: {
      title: 'Nutrition Coaching in Panchavati, Nashik | Jaguar Fitness Den',
      description:
        'Expert nutrition coaching at Jaguar Fitness Den, Panchavati, Nashik, with members-app diet and body-stat tracking to match your training goals.',
    },
  },
];
