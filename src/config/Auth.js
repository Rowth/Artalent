import AsyncStorage from '@react-native-async-storage/async-storage';
export const onLogin = data => {
  try {
    return AsyncStorage.setItem(
      'Auth',
      JSON.stringify({isLogin: true, ...data}),
    );
  } catch (e) {
    // saving error
    Alert.alert('Error get in AsyncStorage on Login');
  }
};
export const onLogout = data => {
  try {
    return AsyncStorage.setItem('Auth', JSON.stringify({isLogin: false})).then(
      res => console.log(res),
    );
  } catch (e) {
    // saving error
    Alert.alert('Error get in AsyncStorage on Logout');
  }
};
