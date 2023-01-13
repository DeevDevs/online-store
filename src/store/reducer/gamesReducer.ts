import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GAMES } from './games';
import * as types from './../../staticData/baseTypes';

const initialState: types.TPageStoreState = {
  games: GAMES,
  filterText: '',
  filterPlayers: { min: 2, max: 8 },
  filterCountInStock: { min: 1, max: 201 },
  filterPrice: { min: 8, max: 350 },
  sort: { param: types.ESortParam.rating, trend: types.ESortTrend.descending },
  categories: [],
  producers: [],
  layout: types.ELayout.cards,
};

// To use only in reducers
function filterGames(state: types.TPageStoreState): types.TGame[] {
  state.games = textFilter(GAMES, state.filterText);
  state.games = state.games.filter(
    (game) =>
      game.numOfPlayers >= state.filterPlayers.min &&
      game.numOfPlayers <= state.filterPlayers.max &&
      game.inStock >= state.filterCountInStock.min &&
      game.inStock <= state.filterCountInStock.max &&
      game.price >= state.filterPrice.min &&
      game.price <= state.filterPrice.max &&
      state.categories.every((cat) => game.categories.includes(cat)) &&
      (state.producers.length === 0 ||
        state.producers.find((prod) => prod === game.produced))
  );
  state.games = sortGames(state.games, state.sort);
  return state.games;
}

function sortGames(games: types.TGame[], sort: types.TSort): types.TGame[] {
  const { param, trend } = sort;
  return games.sort((game1, game2) => {
    if (trend === types.ESortTrend.ascending) {
      return game1[param] - game2[param];
    } else {
      return game2[param] - game1[param];
    }
  });
}

function textFilter(games: types.TGame[], text: string): types.TGame[] {
  const textLowered: string = text.toLowerCase();
  return games.filter((game) => {
    return (
      game.name.toLowerCase().includes(textLowered) ||
      game.description.toLowerCase().includes(textLowered) ||
      game.rating.toString().toLowerCase().includes(textLowered) ||
      game.categories.some((cat) => cat.toLowerCase().includes(textLowered)) ||
      game.produced.toLowerCase().includes(textLowered) ||
      game.price.toString().toLowerCase().includes(textLowered) ||
      game.inStock.toString().toLowerCase().includes(textLowered)
    );
  });
}

const gameSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setNumOfPlayers(state, action: PayloadAction<types.TRange>): void {
      state.filterPlayers = action.payload;
      state.games = filterGames(state);
    },
    setCountInStock(state, action: PayloadAction<types.TRange>): void {
      state.filterCountInStock = action.payload;
      state.games = filterGames(state);
    },
    setPrice(state, action: PayloadAction<types.TRange>): void {
      state.filterPrice = action.payload;
      state.games = filterGames(state);
    },
    sort(state, action: PayloadAction<types.TSort>): void {
      state.sort = action.payload;
      state.games = sortGames(state.games, action.payload);
    },
    toggleCategory(state, action: PayloadAction<types.ECategory>): void {
      setDefaultRangeValues(state);
      state.categories = state.categories.includes(action.payload)
        ? state.categories.filter((cat) => cat !== action.payload)
        : [...state.categories, action.payload];
      state.games = filterGames(state);
      setRangeValues(state);
    },
    toggleProd(state, action: PayloadAction<string>): void {
      setDefaultRangeValues(state);
      state.producers = state.producers.includes(action.payload)
        ? state.producers.filter((producer) => producer !== action.payload)
        : [...state.producers, action.payload];
      state.games = filterGames(state);
      setRangeValues(state);
    },
    setTextFilter(state, action: PayloadAction<string>): void {
      setDefaultRangeValues(state);
      state.filterText = action.payload;
      state.games = filterGames(state);
      setRangeValues(state);
    },
    setCategories(state, action: PayloadAction<types.ECategory[]>): void {
      setDefaultRangeValues(state);
      state.categories = action.payload;
      state.games = filterGames(state);
      setRangeValues(state);
    },
    setLayout(state, action: PayloadAction<types.ELayout>): void {
      state.layout = action.payload;
    },
    setProd(state, action: PayloadAction<string[]>): void {
      state.producers = action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

function setDefaultRangeValues(state: types.TPageStoreState) {
  state.filterPlayers = { min: 2, max: 8 };
  state.filterCountInStock = { min: 1, max: 201 };
  state.filterPrice = { min: 8, max: 350 };
}

function setRangeValues(
  state: types.TPageStoreState,
  isDoubleRangeUsed = false
) {
  if (isDoubleRangeUsed) return;
  const minMaxPlayers: number[] = state.games.map((game) => game.numOfPlayers);
  const minMaxInStock: number[] = state.games.map((game) => game.inStock);
  const minMaxPrice: number[] = state.games.map((game) => game.price);
  if (minMaxPlayers.length > 0) {
    state.filterPlayers = {
      min: Math.floor(Math.min(...minMaxPlayers)),
      max: Math.ceil(Math.max(...minMaxPlayers)),
    };
  } else state.filterPlayers = { min: 2, max: 8 };

  if (minMaxInStock.length > 0) {
    state.filterCountInStock = {
      min: Math.floor(Math.min(...minMaxInStock)),
      max: Math.ceil(Math.max(...minMaxInStock)),
    };
  } else state.filterCountInStock = { min: 1, max: 201 };

  if (minMaxInStock.length > 0) {
    state.filterPrice = {
      min: Math.floor(Math.min(...minMaxPrice)),
      max: Math.ceil(Math.max(...minMaxPrice)),
    };
  } else state.filterPrice = { min: 8, max: 350 };
}

export const gameReducer = gameSlice.reducer;
export const gameActions = gameSlice.actions;
