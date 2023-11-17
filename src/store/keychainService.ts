import {getGenericPassword, setGenericPassword} from 'react-native-keychain';

export const setUserData = async (data: any) => {
  const userName = data.additionalUserInfo?.given_name || data.user.displayName;
  await setGenericPassword(userName, data.user.uid);
};

export const getUserData = async () => {
  const {username, password} = await getGenericPassword();
  return {username: username, uid: password};
};
