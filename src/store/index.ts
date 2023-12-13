import {createContext, useContext} from 'react';
import {BookListStore} from './booksStore';
import { SearchResultsStore } from './searchStore';

export class RootStore {
  booksListStore: BookListStore;
  searchStore: SearchResultsStore;

  constructor() {
    this.booksListStore = new BookListStore();
    this.searchStore = new SearchResultsStore();
  }
}

export const rootStore = new RootStore();

export const StoreContext = createContext(rootStore);
export const StoreProvider = StoreContext.Provider;

export function useStore() {
  const store = useContext(StoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}
