import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View, Text} from 'react-native';
import {Provider} from 'react-redux';
import {store, persistor} from './src/Store/index';
import {PersistGate} from 'redux-persist/integration/react';
import {
  Details,
  SelectInterest,
  Home,
  Login,
  Wallet,
  Withdraw,
  Transaction,
  Verification,
  ReferAndEarn,
  Splash,
  ManageInterest,
  ManagesCountries,
  ManageStates,
  VedioRecoder,
  ManageCities,
  About,
  MusicLibrary,
  Likes,
  Comments,
  AddMusic,
  Notification,
  RegisterContest,
  Following,
  Followers,
  Information,
  Winners,
  Setting,
  OwnStory,
  OtherStory,
  ViewerList,
  BlockList,
  ManageSubAdmin,
  SubAdminDetails,
  FilterInterest,
  FeedCamera,
  SlideUpGallery,
  TotalUserByStates,
  AddPost,
  NewHome,
  Star,
  ContestList,
  Profile,
  RegularContest,
  AddBalance,
  ViewPost,
  Info,
  Starter,
  ViewSpecialContest,
  ViewProfile,
  CameraEditor,
  ShareFeed,
  ViewImage,
  ApplyFilter,
  Draft,
} from '@screens';
import Stack from './src/Navigation/Stack';
import BottomTab from './src/Navigation/BottomTab';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { TextInput } from "@components"
console.disableYellowBox = true;
// import { BackgroundColors } from '@config';
const App = () => {
  const [Auth, setAuth] = useState(null);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('Auth');
      const res = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(res, 'vcvcv');
      if (res !== null) {
        SplashScreen.hide();
        setAuth({...res, starterStatus: false});
      } else if (res === null) {
        SplashScreen.hide();
        setAuth({isLoggedIn: false, starterStatus: true});
      } else {
        SplashScreen.hide();
        setAuth({isLoggedIn: false, starterStatus: true});
        // navigation.replace('Login');
      }

      return res;
    } catch (e) {
      SplashScreen.hide();
      setAuth({isLoggedIn: false});
      console.log(e.message);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <>
          {/* <SelectInterest /> */}
          {/* <Details /> */}
          {/* <NavigationDrawer /> */}
          {/* <BottomTab /> */}
          {/* <Login /> */}
          {/* <Verification /> */}
          {/* <Wallet /> */}
          {/* <Withdraw /> */}
          {/* <Transaction /> */}
          {/* <Home /> */}
          {/* <ReferAndEarn /> */}
          {/* <Splash/> */}
          {/* <ManageInterest /> */}
          {/* <ManagesCountries /> */}
          {/* <ManageStates /> */}
          {/* <ManageCities /> */}
          {/* <About /> */}
          {/* <MusicLibrary /> */}
          {/* <Likes /> */}
          {/* <Comments /> */}
          {/* <AddMusic /> */}
          {/* <RegisterContest /> */}
          {/* <Notification /> */}
          {/* <Following /> */}
          {/* <Followers /> */}
          {/* <Information /> */}
          {/* <Winners /> */}
          {/* <Setting /> */}
          {/* <OwnStory /> */}
          {/* <OtherStory /> */}
          {/* <ViewerList /> */}
          {/* <BlockList /> */}
          {/* <ManageSubAdmin /> */}
          {/* <SubAdminDetails /> */}
          {/* <FilterInterest /> */}
          {/* <FeedCamera /> */}
          {/* <SlideUpGallery /> */}
          {/* <TotalUserByStates /> */}
          {/* <AddPost /> */}
          {/* <NewHome /> */}
          {/* <Star /> */}
          {/* <ContestList /> */}
          {/* <Profile /> */}
          {/* <RegularContest /> */}
          {/* <Stack Auth={Auth} /> */}
          {/* <AddBalance /> */}
          {/* <ViewPost></ViewPost> */}
          {/* <RegularContest /> */}
          {/* <Info /> */}
          {/* <Starter /> */}
          {/* <ViewSpecialContest /> */}
          {/* <ViewProfile /> */}
          {/* <CameraEditor /> */}
          <Stack Auth={Auth} />
          {/* <VedioRecoder /> */}
          {/* <ShareFeed /> */}
          {/* <ViewImage /> */}
          {/* <ApplyFilter /> */}
        </>
      </PersistGate>
    </Provider>
  );
};
const styles = StyleSheet.create({});

export default App;
