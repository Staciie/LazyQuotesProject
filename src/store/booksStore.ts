import React from 'react';
import {action, makeAutoObservable} from 'mobx';
import {getListByUserId} from '../services/dbService';
import {onSnapshot} from 'firebase/firestore';

export class BookListStore {
  bookList: unknown[] = [];
  loading: boolean = true;
  constructor() {
    makeAutoObservable(this, {
      setList: action,
      setLoading: action,
    });
  }

  updateBookList(userId: string) {
    const listRef = getListByUserId(userId);
    onSnapshot(listRef, {
      next: (snapshot) => {
        const bookList: any[] = [];
        snapshot.docs.forEach((doc) => {
          bookList.push({id: doc.id, ...doc.data()});
        });
        this.setList(bookList);
        this.setLoading(false);
      },
    });
  }

  setLoading(state) {
    this.loading = state;
  }
  setList(list) {
    this.bookList = list;
  }
  findById(id: string) {
    return this.bookList.some((item) => item.id === id);
  }
  resetBookList() {
    this.bookList = [];
  }
  isBookEmpty() {
    return this.bookList.length === 0;
  }
}
