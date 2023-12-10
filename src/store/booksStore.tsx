import React from 'react';
import {action, makeAutoObservable} from 'mobx';
import {getListByUserId} from '../services/dbService';
import {onSnapshot} from 'firebase/firestore';

export class BookListStore {
  bookList: unknown[] = [];
  constructor() {
    makeAutoObservable(this, {
      setList: action,
    });
  }

  updateBookList(userId: string, setLoading) {
    const listRef = getListByUserId(userId);
    onSnapshot(listRef, {
      next: (snapshot) => {
        const bookList: any[] = [];
        snapshot.docs.forEach((doc) => {
          bookList.push({id: doc.id, ...doc.data()});
        });
        this.setList(bookList);
        setLoading(false);
      },
    });
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
}
