import { appReducer, appStore } from '../store';

export type TAppReducer = ReturnType<typeof appReducer>;
export type TAppStore = ReturnType<typeof appStore>;
export type TAppDispatch = TAppStore['dispatch'];

export type TGame = {
  id: number;
  name: string;
  price: number;
  inStock: number;
  rating: number;
  description: string;
  numOfPlayers: number;
  categories: string[];
  images: string[];
  previewImg: string;
  produced: string;
};

export type TGameCardProps = {
  game: TGame;
  prodParent?: boolean;
};

export interface TGameProps<Y> {
  games: Y;
}

export type TGameCardsProp = TGameProps<TGame[]>;

export type WrapperProps = {
  children: React.ReactNode;
};

export enum ECartViewParams {
  itemsPerPage = 'itemsPerPage',
  currentPage = 'currentPage',
}

export enum ESearchParams {
  minPrice = 'minPrice',
  maxPrice = 'maxPrice',
  minInStock = 'minInStock',
  maxInStock = 'maxInStock',
  minPlayers = 'minPlayers',
  maxPlayers = 'maxPlayers',
}

export type TRange = {
  min: number;
  max: number;
};

export type useStateState = {
  seconds: number;
};

export type TDoubleRangeProps = {
  min: number;
  max: number;
  left: number;
  right: number;
  onChange: (min: number, max: number) => void;
};

export enum ESortParam {
  rating = 'rating',
  price = 'price',
}

export enum ESortTrend {
  ascending = 'ascending',
  descending = 'descending',
}

export enum ECategory {
  strategy = 'strategy',
  cards = 'cards',
  quiz = 'quiz',
  economy = 'economy',
  kids = 'kids',
  role = 'role',
}

export enum ELayout {
  list = 'list',
  cards = 'cards',
}

export type TSort = {
  param: ESortParam;
  trend: ESortTrend;
};

export type TPageStoreState = {
  games: TGame[];
  filterText: string;
  filterPlayers: TRange;
  filterCountInStock: TRange;
  filterPrice: TRange;
  sort: TSort;
  categories: ECategory[];
  producers: string[];
  layout: ELayout;
};

export type propsDivCategory = {
  category: ECategory;
  srcImg: string;
  label: string;
};

// About Product Page Types
export type crumbsParams = {
  params: {
    producer: string;
    game?: TGame;
  };
};

export type TPropsRatingDisplay = {
  rating: number;
};

export type TPropsCategoriesDisplay = {
  categories: string[];
};

// Shopping Cart Types
export interface ICartGame {
  game: TGame;
  quantity: number;
  position: number;
}

export type TCartPageState = {
  cartGames: ICartGame[];
  totalPrice: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  firstIndex: number;
  lastIndex: number;
  promoCodes: discountObj[];
  discountTotal: number;
  totalQuantity: number;
};

export type discountObj = { code: string; discount: number };

export type curGameID = {
  id: number;
};

export type TPromoCode = {
  promo: discountObj;
  index: number;
};

export type setCounter = {
  setCounter: React.Dispatch<React.SetStateAction<number>>;
};

export type promoObject = {
  code: string;
  discount: number;
};
