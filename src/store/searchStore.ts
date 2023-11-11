import {action, makeAutoObservable} from 'mobx';
import axios from 'axios';
import {Alert} from 'react-native';

export class SearchResultsStore {
  searchResults = [];
  searchQuery = '';
  pageIndex: number = 0;
  promptVisible = false;
  totalNumber = 0;
  constructor() {
    makeAutoObservable(this, {
      setSearchResults: action,
      setPromptVisible: action,
      setSearchQuery: action,
      setTotalNumber: action,
    });
  }

  setSearchResults(resultsList) {
    this.searchResults = resultsList;
  }
  setPromptVisible(value: boolean) {
    this.promptVisible = value;
  }
  setSearchQuery(value: string) {
    this.searchQuery = value;
  }
  setTotalNumber(number: number) {
    this.totalNumber = number;
  }

  performSearch(query: string, navigation) {
    this.setSearchQuery(query);
    const isbnRegExp = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
    const isCode = isbnRegExp.test(this.searchQuery);
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${
          isCode ? `isbn:${this.searchQuery}` : this.searchQuery
        }&maxResults=30&startIndex=${this.pageIndex}`,
      )
      .then((result) => {
        this.setSearchResults(result.data);
        this.setTotalNumber(result.data.totalItems);
        if (result.data.totalItems) {
          navigation.navigate('Search');
        } else {
          this.setPromptVisible(true);
        }
      })
      .catch((error) => console.log(error));
  }

  resetSearchResults() {
    this.searchResults = [];
  }
}
