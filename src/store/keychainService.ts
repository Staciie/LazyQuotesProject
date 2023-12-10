import {
  getGenericPassword,
  getInternetCredentials,
  hasInternetCredentials,
  resetGenericPassword,
  setGenericPassword,
  setInternetCredentials,
} from 'react-native-keychain';

export const setUserData = async (data: any) => {
  const userName = data.additionalUserInfo?.given_name || data.user.displayName;

  const wasSaved = await hasInternetCredentials(data.user.uid);
  if (wasSaved) {
    const {username, server} = await getInternetCredentials(data.user.uid);
    await setGenericPassword(username, server);
  } else {
    await setInternetCredentials(data.user.uid, userName, data.user.email);
    await setGenericPassword(userName, data.user.uid);
  }
};

export const getUserData = async () => {
  const {username, password} = await getGenericPassword();
  return {username: username, uid: password};
};

export const changeName = async (name: string) => {
  const {uid} = await getUserData();
  const {password} = await getInternetCredentials(uid);
  await setInternetCredentials(uid, name, password);
  await setGenericPassword(name, uid);
};

export const resetUserData = async () => {
  await resetGenericPassword();
};
