
export type Category = {
  id: string;
  name: string;
  description: string;
};

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Mud Work',
    description: 'Art pieces designed to be displayed on a wall.',
  },
  {
    id: 'cat-2',
    name: 'Painting',
    description: 'Freestanding, three-dimensional art pieces.',
  },
  {
    id: 'cat-3',
    name: 'Mandala Art',
    description: 'Functional and decorative vessels.',
  },
  {
    id: 'cat-4',
    name: 'Decorative Tiles',
    description: 'Individual tiles for creative installations.',
  },
];
