import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {
  Details,
  SelectInterest,
  Home,
  Login,
  Wallet,
  Withdraw,
  Transaction,
  Verification,
  Splash,
  ContestList,
  Winners,
  ProfileContest,
  ViewContest,
  EditProfile,
  Following,
  Followers,
  OwnStory,
  OtherStory,
  ViewerList,
  Notification,
  Information,
  AddBalance,
  ViewPost,
  Info,
  Starter,
  RegularContest,
  ViewSpecialContest,
  ViewProfile,
  CameraEditor,
  ViewImage,
  OwnFollowers,
  AddPost,
  Star,
  BlockList,
  ViewContestFeed,
  CropImage,
  WinnersSpecial,
  ApplyFilter,
  VedioRecoder,
  ShareFeed,
} from '@screens';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavigationDrawer from './NavigationDrawer';

const Stack = createNativeStackNavigator();

const Index = ({Auth}) => {
  // const [auth, setAuth] = useState(false);

  // getData().then(res => setAuth(res));

  return Auth !== null ? (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          !Auth.starterStatus
            ? Auth.isLogin
              ? Auth.user_data !== null
                ? Auth.user_interest !== null && Auth.user_interest?.length > 0
                  ? 'DrawerNavigation'
                  : 'SelectInterest'
                : 'Details'
              : 'Login'
            : 'Starter'
          // 'DrawerNavigation'
        }
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Starter" component={Starter} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="SelectInterest" component={SelectInterest} />
        <Stack.Screen name="ContestList" component={ContestList} />
        <Stack.Screen name="Winners" component={Winners} />
        <Stack.Screen name="ProfileContest" component={ProfileContest} />
        <Stack.Screen name="ViewContest" component={ViewContest} />
        <Stack.Screen name="Following" component={Following} />
        <Stack.Screen name="Followers" component={Followers} />
        <Stack.Screen name="OwnFollowers" component={OwnFollowers} />
        <Stack.Screen name="OwnStory" component={OwnStory} />
        <Stack.Screen name="OtherStory" component={OtherStory} />
        <Stack.Screen name="ViewerList" component={ViewerList} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Withdraw" component={Withdraw} />
        <Stack.Screen name="Transaction" component={Transaction} />
        <Stack.Screen name="Information" component={Information} />
        <Stack.Screen name="DrawerNavigation" component={NavigationDrawer} />
        <Stack.Screen name="AddBalance" component={AddBalance} />
        <Stack.Screen name="ViewPost" component={ViewPost} />
        <Stack.Screen name="Info" component={Info} />
        <Stack.Screen name="RegularContest" component={RegularContest} />
        <Stack.Screen name="ViewProfile" component={ViewProfile} />
        <Stack.Screen name="CameraEditor" component={CameraEditor} />
        <Stack.Screen name="ViewImage" component={ViewImage} />
        <Stack.Screen name="AddPost" component={AddPost} />
        <Stack.Screen name="star" component={Star} />
        <Stack.Screen name="BlockList" component={BlockList} />
        <Stack.Screen
          name="ViewSpecialContest"
          component={ViewSpecialContest}
        />
        <Stack.Screen name="ViewContestFeed" component={ViewContestFeed} />
        <Stack.Screen name="CropImage" component={CropImage} />
        <Stack.Screen name="WinnersSpecial" component={WinnersSpecial} />
        <Stack.Screen name="ApplyFilter" component={ApplyFilter} />
        <Stack.Screen name="VedioRecoder" component={VedioRecoder} />
        <Stack.Screen name="ShareFeed" component={ShareFeed} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : null;
};

export default Index;
