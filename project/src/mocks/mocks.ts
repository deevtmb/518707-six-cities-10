import { datatype, date, image, lorem, name } from 'faker';
import { Offer } from '../types/offer';
import { Review } from '../types/review';

export const makeFakeReviews = (): Review[] => Array.from({length: 4}, () => ({
  comment: lorem.text(),
  date: String(date.past()),
  id: datatype.number(),
  rating: datatype.float({ min: 0, max: 5, precision: 0.1 }),
  user: {
    avatarUrl: image.people(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
}));

export const makeFakeOffer = (): Offer => ({
  bedrooms: datatype.number({min: 1, max: 10}),
  city: {
    location: {
      latitude: datatype.float({min: -180, max: 180}),
      longitude: datatype.float({min: -180, max: 180}),
      zoom: datatype.number({min: 1, max: 20})
    },
    name: 'Paris',
  },
  description: lorem.text(),
  goods: [datatype.string(), datatype.string()],
  host: {
    avatarUrl: image.people(),
    id: datatype.number({min: 1, max: 100}),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
  id: 1,
  images: [image.city(), image.nature()],
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: {
    latitude: datatype.float({min: -180, max: 180}),
    longitude: datatype.float({min: -180, max: 180}),
    zoom: datatype.number({min: 1, max: 20})
  },
  maxAdults: datatype.number({min: 1, max: 10}),
  previewImage: image.city(),
  price: datatype.number({min: 1, max: 2000}),
  rating: datatype.float({min: 0, max: 5}),
  title: lorem.text(),
  type: 'apartment',
});

export const makeFakeOffers = (): Offer[] => Array.from({length: 10}, (_, i) => {
  const offer = makeFakeOffer();
  offer.id = i + 1;
  return offer;
});
