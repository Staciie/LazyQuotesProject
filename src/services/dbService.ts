import {addDoc, collection, doc} from 'firebase/firestore';
import {db} from '../config/firebaseConfig';

export const getListByUserId = (userId: string) => {
  const collectionRef = collection(db, 'users');
  const userRef = doc(collectionRef, userId);
  const listRef = collection(userRef, 'list');
  return listRef;
};

export const postBook = async (userId: string, bookData: any) => {
  const listRef = getListByUserId(userId);
  await addDoc(listRef, bookData);
};
