import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TGame, games } from './games';

type TRange = {
  min: number;
  max: number;
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

type TSort = {
  param: ESortParam;
  trend: ESortTrend;
};

type TPageStoreState = {
  games: TGame[];
  filterPlayers: TRange;
  filterCountInStock: TRange;
  filterPrice: TRange;
  sort: TSort;
  categories: ECategory[];
  producers: string[];
  layout: ELayout;
};

const initialState: TPageStoreState = {
  games,
  filterPlayers: { min: 0, max: 25 },
  filterCountInStock: { min: 0, max: 100 },
  filterPrice: { min: 0, max: 1000 },
  sort: { param: ESortParam.rating, trend: ESortTrend.descending },
  categories: [],
  producers: [],
  layout: ELayout.cards,
};

// To use only in reducers
function filterGames(state: TPageStoreState): TGame[] {
  console.log('Фильтрую');
  state.games = games.filter(
    (game) =>
      game.numOfPlayers > state.filterPlayers.min &&
      game.numOfPlayers < state.filterPlayers.max &&
      game.inStock > state.filterCountInStock.min &&
      game.inStock < state.filterCountInStock.max &&
      game.price > state.filterPrice.min &&
      game.price < state.filterPrice.max &&
      state.categories.every((cat) => game.categories.includes(cat)) &&
      (state.producers.length === 0 ||
        state.producers.find((prod) => prod === game.produced))
  );

  return state.games;
}

const gameSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setNumOfPlayers(state, action: PayloadAction<TRange>) {
      state.filterPlayers = action.payload;
      state.games = filterGames(state);
    },
    setCountInStock(state, action: PayloadAction<TRange>) {
      state.filterCountInStock = action.payload;
      state.games = filterGames(state);
    },
    setPrice(state, action: PayloadAction<TRange>) {
      state.filterPrice = action.payload;
      state.games = filterGames(state);
    },
    sort(state, action: PayloadAction<TSort>) {
      state.sort = action.payload;
      state.games = state.games.sort((game1, game2) => {
        if (action.payload.trend === ESortTrend.ascending) {
          return game1[action.payload.param] - game2[action.payload.param];
        } else {
          return game2[action.payload.param] - game1[action.payload.param];
        }
      });
    },
    toggleCategory(state, action: PayloadAction<ECategory>) {
      state.categories = state.categories.includes(action.payload)
        ? state.categories.filter((cat) => cat !== action.payload)
        : [...state.categories, action.payload];
      state.games = filterGames(state);
    },
    toggleProd(state, action: PayloadAction<string>) {
      state.producers = state.producers.includes(action.payload)
        ? state.producers.filter((producer) => producer !== action.payload)
        : [...state.producers, action.payload];
      state.games = filterGames(state);
    },
    setCategories(state, action: PayloadAction<ECategory[]>) {
      state.categories = action.payload;
      state.games = filterGames(state);
    },
    setLayout(state, action: PayloadAction<ELayout>) {
      state.layout = action.payload;
    },
    setProd(state, action: PayloadAction<string[]>) {
      state.producers = action.payload;
    },
    resetFilters(state) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialState;
    },
  },
});

export const gameReducer = gameSlice.reducer;
export const gameActions = gameSlice.actions;
