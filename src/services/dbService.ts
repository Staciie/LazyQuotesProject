import {collection, doc, getDoc, setDoc} from 'firebase/firestore';
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

export const checkIfBookExists = async (userId: string, bookId: string) => {
  const listRef = getListByUserId(userId);
  const bookRef = doc(listRef, bookId);
  const bookSnap = await getDoc(bookRef);

  if (bookSnap.exists()) {
    return true;
  } else {
    return false;
  }
};
