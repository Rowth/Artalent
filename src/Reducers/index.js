import {combineReducers} from 'redux';
import StoryData from './StoryData';
import Profile from './Profile';
import MusicList from './MusicList';

export default combineReducers({
  UploadStoryData: StoryData,
  Profile: Profile,
  MusicList: MusicList,
});
