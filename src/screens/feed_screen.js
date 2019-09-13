import React , { Component} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {
    StreamApp,
    FlatFeed,
    Activity,
    LikeButton,
    StatusUpdateForm,
    ReactionIcon
} from 'expo-activity-feed';
import { StatusBar, Image, TouchableOpacity, View } from 'react-native';
import{EvilIcons} from '@expo/vector-icons';


export default class Feed extends Component {
  constructor(props) {
    super(props);

    
    this.state = {
        user: this.props.navigation.getParam('user'),
        id: this.props.navigation.getParam('id')
        
    }}
  

CustomActivity = (props) => {
  return (
    <Activity 
      {...props}
      Footer={
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <LikeButton {...props} />

        <ReactionIcon
          icon={require('../../images/icons/reply.png')}
          labelSingle="comment"
          labelPlural="comments"
          counts={props.activity.reaction_counts}
          kind="comment"
        />
      </View>
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
          userId="dana"
          token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidXNlci1vbmUifQ.LIfq7ANe2qQo58tsgEogA7EXeMhj4K1eyHXYypj2xmo"
          defaultUserData={{name: this.state.user.name}}>
        <FlatFeed  Activity={this.CustomActivity} notify />
        <StatusUpdateForm feedGroup="timeline" />
      </StreamApp>
    </SafeAreaView>
  );
};

}