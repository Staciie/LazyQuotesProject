import {action, makeAutoObservable} from 'mobx';
import {getListByUserId, postQuote} from '../services/dbService';
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
  checkById(id: string) {
    return this.bookList.some((item) => item.id === id);
  }

  findBookById(id: string) {
    return this.bookList.find((item) => item.id === id);
  }

  postQuote(quoteObject, bookId, userId) {
    const bookData = this.findBookById(bookId);
    let refList;
    if (bookData.hasOwnProperty('quoteList')) {
      refList = bookData.quoteList;
      refList.push({
        ...quoteObject,
        id: 'id' + Math.random().toString(16).slice(2),
      });
    } else {
      refList = [
        {...quoteObject, id: 'id' + Math.random().toString(16).slice(2)},
      ];
    }
    postQuote(userId, bookId, refList);
  }

  resetBookList() {
    this.bookList = [];
  }
  isBookEmpty() {
    return this.bookList.length === 0;
  }
}
