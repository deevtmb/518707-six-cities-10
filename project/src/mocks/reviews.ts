import {Review} from '../types/review';

export const reviewsList: Review[] = [
  {
    comment: 'Tempor sit labore id et. Enim laborum excepteur irure amet non qui do anim officia enim non.',
    date: `${new Date()}`,
    id: 1,
    rating: 4,
    user: {
      avatarUrl: 'img/avatar.svg',
      id: 1,
      isPro: false,
      name: 'Unknown'
    }
  },
  {
    comment: 'Tempor sit labore id et. Enim laborum excepteur irure amet non qui do anim officia enim non.',
    date: `${new Date()}`,
    id: 2,
    rating: 2,
    user: {
      avatarUrl: 'img/avatar-max.jpg',
      id: 2,
      isPro: false,
      name: 'Max'
    }
  },
  {
    comment: 'Tempor sit labore id et. Enim laborum excepteur irure amet non qui do anim officia enim non.',
    date: `${new Date()}`,
    id: 3,
    rating: 4,
    user: {
      avatarUrl: 'img/avatar.svg',
      id: 3,
      isPro: true,
      name: 'Alex'
    }
  },
  {
    comment: 'Tempor sit labore id et. Enim laborum excepteur irure amet non qui do anim officia enim non.',
    date: '2022-06-13T12:25:36.938Z',
    id: 4,
    rating: 5,
    user: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 4,
      isPro: false,
      name: 'Angelina'
    }
  }
];
