import { TGame } from './baseTypes';

export const EMPTY_GAME: TGame = {
  id: 0,
  name: 'Game Not Found',
  price: 0,
  inStock: 0,
  rating: 0,
  description: 'dummy',
  numOfPlayers: 0,
  categories: ['dummy'],
  images: ['dummy'],
  previewImg: 'dummy',
  produced: 'dummy',
};

export const ARR_OF_CATEGORIES: string[] = [
  'strategy',
  'cards',
  'quiz',
  'economy',
  'kids',
  'role',
];

export const ARR_OF_CATEGORY_NAMES: string[] = [
  'strategy',
  'cards',
  'quiz',
  'economy',
  'kids',
  'role play',
];

export const INTEGERS_REG_EXP = /^\d+$/;

export const LETTERS_REG_EXP = /^[A-Za-z ]*$/;

export const EMAIL_REG_EXP =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const ALL_PROMOCODES: string[] = [
  'ZEUS',
  'MAFIA',
  'ENTROPY',
  'SLAANESH',
];

export const ALL_DISCOUNTS: number[] = [5, 5, 10, 20];

export const PRODUCERS: string[] = [
  'GMT Games',
  'Hasbro',
  'FryxGames',
  'Arclight Games',
  'Stonemaier Games',
  'Cephalofair Games',
  'Hans im Gluck',
];

export const PROMOCODES: string[] = ['ZEUS', 'SLAANESH', 'ENTROPY', 'MAFIA'];
