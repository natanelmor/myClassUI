import React , { Component} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {
    StreamApp,
    FlatFeed,
    Activity,
    LikeButton,
    StatusUpdateForm,
} from 'expo-activity-feed';

export default class Feed extends Component {

CustomActivity = (props) => {
  return (
    <Activity
      {...props}
      Footer={
        <LikeButton {...props} />
      }
    />
  );
};

render() {
  return (
    <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always' }}>
      <StreamApp
          apiKey="gz5x4stjau7m"
          appId="59142"
          token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidXNlci1vbmUifQ.LIfq7ANe2qQo58tsgEogA7EXeMhj4K1eyHXYypj2xmo"
      >
        <FlatFeed Activity={this.CustomActivity} notify />
        <StatusUpdateForm feedGroup="timeline" />
      </StreamApp>
    </SafeAreaView>
  );
};

}