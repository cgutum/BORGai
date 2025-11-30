import { ProductHierarchy } from '../types';

// TODO: Replace with API call to /api/products/hierarchy
export const hardcodedProductHierarchy: ProductHierarchy[] = [
  {
    id: 'l1-automotive',
    level: 'L1',
    name: 'Automotive Components',
    children: [
      {
        id: 'l2-turbo',
        level: 'L2',
        name: 'Turbochargers',
        parent: 'l1-automotive',
        children: [
          {
            id: 'l3-turbo-diesel',
            level: 'L3',
            name: '3.0L Diesel Turbo',
            parent: 'l2-turbo',
          },
          {
            id: 'l3-turbo-petrol',
            level: 'L3',
            name: '2.0L Petrol Turbo',
            parent: 'l2-turbo',
          },
        ],
      },
      {
        id: 'l2-engine',
        level: 'L2',
        name: 'Engine Cores',
        parent: 'l1-automotive',
        children: [
          {
            id: 'l3-engine-4cyl',
            level: 'L3',
            name: '4-Cylinder Engines',
            parent: 'l2-engine',
          },
          {
            id: 'l3-engine-6cyl',
            level: 'L3',
            name: '6-Cylinder Engines',
            parent: 'l2-engine',
          },
        ],
      },
      {
        id: 'l2-transmission',
        level: 'L2',
        name: 'Transmission',
        parent: 'l1-automotive',
        children: [
          {
            id: 'l3-trans-manual',
            level: 'L3',
            name: 'Manual Transmission',
            parent: 'l2-transmission',
          },
          {
            id: 'l3-trans-auto',
            level: 'L3',
            name: 'Automatic Transmission',
            parent: 'l2-transmission',
          },
        ],
      },
      {
        id: 'l2-starter',
        level: 'L2',
        name: 'Starter Motors',
        parent: 'l1-automotive',
      },
      {
        id: 'l2-alternator',
        level: 'L2',
        name: 'Alternators',
        parent: 'l1-automotive',
      },
      {
        id: 'l2-battery',
        level: 'L2',
        name: 'Battery Cores',
        parent: 'l1-automotive',
      },
    ],
  },
];
