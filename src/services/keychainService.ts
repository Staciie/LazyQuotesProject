import {
  getGenericPassword,
  getInternetCredentials,
  hasInternetCredentials,
  resetGenericPassword,
  setGenericPassword,
  setInternetCredentials,
} from 'react-native-keychain';

export const setUserData = async (data: any) => {
  if (data !== null) {
    const userName =
      data.additionalUserInfo?.given_name || data.user.displayName;
    const wasSaved = await hasInternetCredentials(data.user.uid);
    if (wasSaved) {
      const {username, service} = await getInternetCredentials(data.user.uid);
      // fix edgecase when user was added befor
      await setInternetCredentials(data?.user.uid, userName, data?.user.email);
      await setGenericPassword(username, data.user.uid);
    } else {
      await setInternetCredentials(data?.user.uid, userName, data?.user.email);
      await setGenericPassword(userName, data?.user.uid);
    }
  }
};

export const getUserData = async () => {
  const {username, password} = await getGenericPassword();
  return {username: username, uid: password};
};

export const changeName = async (name: string) => {
  const {uid} = await getUserData();
  const {username, service, password} = await getInternetCredentials(uid);
  await setInternetCredentials(uid, name, password);
  await setGenericPassword(name, uid);
};

export const resetUserData = async () => {
  await resetGenericPassword();
};
