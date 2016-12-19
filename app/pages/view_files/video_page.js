import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
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
  fullScreen: {
    height: 300,
    marginTop: 1,
  },
  controls: {
    height: 320,
    marginLeft: 20,
    marginRight: 20,
  },
  progress: {
    flexDirection: 'row',
    borderRadius: 15,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 6,
    backgroundColor: '#108EE9',
  },
  innerProgressRemaining: {
    height: 6,
    backgroundColor: '#F3F3F3',
  },
  resizeModeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: "#108EE9",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  pause: {
    height: 20,
    width: 16,
    marginTop: -6,
    marginRight: 6,
  }
});

const PLAY_PIC_RESOURCES = [
  require('im_core_mobile/app/assets/image/pause.png'), 
  require('im_core_mobile/app/assets/image/play.png')
];

class VideoPage extends BasePage {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.state = {
      name: "",
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      repeat: false,
      duration: 0.0,
      currentTime: 0.0,
      player_pic: PLAY_PIC_RESOURCES[0],
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

  onLoad(data) {
    this.setState({duration: data.duration});
  }

  onProgress(data) {
    this.setState({currentTime: data.currentTime});
  }

  get_loading() {
    return this.refs['loading']
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    } else {
      return 0;
    }
  }

  renderResizeModeControl(resizeMode) {
    state_text = '';
    if (resizeMode == "contain"){
      state_text = "正常"
    }else if(resizeMode == "cover"){
      state_text = "最大化"
    }else if(resizeMode == "stretch"){
      state_text = "拉伸"
    }
    const isSelected = (this.state.resizeMode == resizeMode);

    return (
      <TouchableOpacity onPress={() => { this.setState({resizeMode: resizeMode}) }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {state_text}
        </Text>
      </TouchableOpacity>
    )
  }

  pause_video(){
    resource = '';
    if (this.state.player_pic == PLAY_PIC_RESOURCES[0]) {
      resource = PLAY_PIC_RESOURCES[1];
    }else if(this.state.player_pic == PLAY_PIC_RESOURCES[1]){
      resource = PLAY_PIC_RESOURCES[0];
    }
    this.setState({
      paused: !this.state.paused,
      player_pic: resource,
    }) 
  }

  render() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

    return (
      <View style={styles.root}>
        <BackNavBar component={this}>{this.state.name}</BackNavBar>

        <TouchableOpacity style={styles.fullScreen} onPress={() => {
          this.pause_video()
        }}>
          <Video source={require('im_core_mobile/app/assets/video/party.mp4')}
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={() => {this.setState({repeat: false})}}
            repeat={this.state.repeat} />
        </TouchableOpacity>

        <View style={styles.controls}>
          <View style={styles.resizeModeControl}>
            {this.renderResizeModeControl('cover')}
            {this.renderResizeModeControl('contain')}
            {this.renderResizeModeControl('stretch')}
          </View>
          <View>
            <View style={styles.progress}>
              <TouchableOpacity style={styles.fullScreen} onPress={() => {
                this.pause_video()
              }}>
                <Image 
                  style={styles.pause} 
                  source={this.state.player_pic} />
              </TouchableOpacity>
              <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]} />
              <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]} />
            </View>
          </View>
        </View>

        <Loading ref={'loading'} />
      </View>
    );
  }
}

export default createForm()(VideoPage)