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
      latitude: datatype.float(),
      longitude: datatype.float(),
      zoom: datatype.number()
    },
    name: name.firstName(),
  },
  description: lorem.text(),
  goods: [],
  host: {
    avatarUrl: image.people(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
  id: datatype.number(),
  images: [],
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: {
    latitude: datatype.float(),
    longitude: datatype.float(),
    zoom: datatype.number()
  },
  maxAdults: datatype.number(),
  previewImage: image.city(),
  price: datatype.number(),
  rating: datatype.float({min: 0, max: 5}),
  title: lorem.text(),
  type: datatype.string(),
});

export const makeFakeOffers = (): Offer[] => Array.from({length: 10}, makeFakeOffer);
