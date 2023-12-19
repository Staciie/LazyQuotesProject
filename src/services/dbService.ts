import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import {db} from '../config/firebaseConfig';

export const getListByUserId = (userId: string) => {
  const collectionRef = collection(db, 'users');
  const userRef = doc(collectionRef, userId);
  const listRef = collection(userRef, 'list');
  return listRef;
};

export const postBook = async (userId: string, bookData: any) => {
  const listRef = getListByUserId(userId);
  await setDoc(doc(listRef, bookData.id), bookData);
};

const getBookRef = (userId: string, bookId: string) => {
  const listRef = getListByUserId(userId);
  const bookRef = doc(listRef, bookId);
  return bookRef;
};

export const postQuote = async (userId, bookId, refList) => {
  const bookRef = getBookRef(userId, bookId);
  await updateDoc(bookRef, {
    quoteList: refList,
  });
};

export const deleteBook = async (userId: string, bookId: string) => {
  const listRef = getListByUserId(userId);
  const bookRef = doc(listRef, bookId);
  await deleteDoc(bookRef);
};
