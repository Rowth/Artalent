import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import {CustomDrawer} from '@components';
import BottomTab from './BottomTab';
import {
  Details,
  SelectInterest,
  ReferAndEarn,
  Home,
  ManagesCountries,
  ManageStates,
  ManageCities,
  Wallet,
  Withdraw,
  ManageInterest,
  EditInterest,
  Transaction,
  About,
  MusicLibrary,
  Likes,
  Comments,
  AddMusic,
  RegisterContest,
  Notification,
  Following,
  Followers,
  Information,
  Winners,
  Setting,
  OwnStory,
  OtherStory,
  ViewerList,
  ManageSubAdmin,
  BlockList,
  SubAdminDetails,
  FilterInterest,
  FeedCamera,
  SlideUpGallery,
  EditProfile,
  CameraEditor,
  Star,
} from '@screens';
const Drawer = createDrawerNavigator();
const RateUs = () => {
  return (
    <View>
      <Text>RateUS</Text>
    </View>
  );
};
export default function App() {
  return (
    <Drawer.Navigator
      defaultStatus="closed"
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#AB0404',
          opacity: 0.8,
        },
      }}>
      <Drawer.Screen name="Home" component={BottomTab} />
      {/* <Drawer.Screen name="Wallet" component={Wallet} /> */}
      <Drawer.Screen name="Drafts" component={SlideUpGallery} />
      <Drawer.Screen name="RegisterContest" component={RegisterContest} />
      <Drawer.Screen name="MusicLibrary" component={MusicLibrary} />
      <Drawer.Screen name="ReferAndEarn" component={ReferAndEarn} />
      <Drawer.Screen name="Rateus" component={RateUs} />
      <Drawer.Screen name="Setting" component={Setting} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />

      {/* <Drawer.Screen name="ManagesCountries" component={ManagesCountries} />
      <Drawer.Screen name="ManageStates" component={ManageStates} />
      <Drawer.Screen name="ManageCities" component={ManageCities} /> */}
      {/* <Drawer.Screen name="Withdraw" component={Withdraw} /> */}
      {/* <Drawer.Screen name="ManageInterest" component={ManageInterest} />
      <Drawer.Screen name="EditInterest" component={EditInterest} /> */}
      {/* <Drawer.Screen name="Transaction" component={Transaction} /> */}
      {/* <Drawer.Screen name="AddMusic" component={AddMusic} />
      <Drawer.Screen name="Likes" component={Likes} />
      <Drawer.Screen name="Comments" component={Comments} /> */}
      {/* <Drawer.Screen name="Notification" component={Notification} /> */}
      {/* <Drawer.Screen name="Following" component={Following} /> */}
      {/* <Drawer.Screen name="Followers" component={Followers} /> */}
      {/* <Drawer.Screen name="Information" component={Information} /> */}
      {/* <Drawer.Screen name="Winners" component={Winners} /> */}
      {/* <Drawer.Screen name="OwnStory" component={OwnStory} />
      <Drawer.Screen name="OtherStory" component={OtherStory} /> */}
      {/* <Drawer.Screen name="ViewerList" component={ViewerList} /> */}
      {/* <Drawer.Screen name="ManageSubAdmin" component={ManageSubAdmin} />
      <Drawer.Screen name="BlockList" component={BlockList} />
      <Drawer.Screen name="SubAdminDetails" component={SubAdminDetails} />
      <Drawer.Screen name="FilterInterest" component={FilterInterest} />
      <Drawer.Screen name="FeedCamera" component={FeedCamera} /> */}
    </Drawer.Navigator>
  );
}
