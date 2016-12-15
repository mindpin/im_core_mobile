import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from 'antd-mobile/lib/button'
import { createForm } from 'rc-form'
import API from 'API'
import BasePage from 'im_core_mobile/app/component/base_page'

import Loading from 'im_core_mobile/app/component/loading'
import BackNavBar from 'im_core_mobile/app/component/back_nav_bar'
import Video from 'react-native-video/Video'


const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

class VideoPage extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    }
  }

  componentDidMount() {
    this.get_loading().show()  
    API.auth.get_ref_files({id: this.props.id}).done((res_data, res)=>{
      this.get_loading().dismiss()
      this.setState({
        name: res_data["name"],
      }) 
    })
  }

  get_loading() {
    return this.refs['loading']
  }

  render() {
    return (
      <View style={styles.root}>
        <BackNavBar component={this}>{this.state.name}</BackNavBar>
        <Video
          resizeMode='cover'
          source={require('im_core_mobile/app/assets/video/test.mp4')}
          style={styles.backgroundVideo}/>
        <Loading ref={'loading'} />
      </View>
    );
  }
}

export default createForm()(VideoPage)