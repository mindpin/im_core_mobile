import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  PanResponder,
  TouchableOpacity
} from 'react-native';

import Button from 'antd-mobile/lib/button'
import { createForm } from 'rc-form'
import API from 'API'
import BasePage from 'im_core_mobile/app/component/base_page'

import Loading from 'im_core_mobile/app/component/loading'
import BackNavBar from 'im_core_mobile/app/component/back_nav_bar'
import Video from 'react-native-video/Video'

const PLAY_PIC_RESOURCES = [
  require('im_core_mobile/app/assets/image/pause.png'), 
  require('im_core_mobile/app/assets/image/play.png')
];

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
    height: 400,
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
    backgroundColor: '#A5A5A5',
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
  },
});

class VideoPage extends BasePage {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.state = {
      name: "",
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      repeat: false,
      duration: 0.0,
      currentTime: 1.0,
      player_pic: PLAY_PIC_RESOURCES[0],
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
        console.log("开始点"+gestureState.dx);
        // gestureState.{x,y}0 现在会被设置为0
      },
      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}
        console.log(gestureState.moveX);
        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // this.player.seek(7);
        console.log(gestureState.x0);
        // if (gestureState.moveX == 389.0) {
        //   console.log("移动触点大于 389");
        //   this.setState({currentTime: this.state.duration});
        // }
        // if (gestureState.moveX == 43.0) {
        //   console.log("移动触点横坐标小于 43");
        //   this.setState({currentTime: 0.5});
        // }
        // 一般来说这意味着一个手势操作已经成功完成。
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    });
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

  onEnd(data){
    this.setState({currentTime: this.state.duration});
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
  set_time(){
    this.player.seek(5);
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
          <Video 
            source={require("im_core_mobile/app/assets/video/party.mp4")}
            ref={(ref) => {
              this.player = ref
            }} 
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            repeat={this.state.repeat} />
        </TouchableOpacity>

        <View style={styles.controls}>
          <View style={styles.resizeModeControl}>
            {this.renderResizeModeControl('cover')}
            {this.renderResizeModeControl('contain')}
            {this.renderResizeModeControl('stretch')}
          </View>
          <View style={styles.progress}>
            <TouchableOpacity onPress={() => {
              this.pause_video()
            }}>
              <Image 
                style={styles.pause} 
                source={this.state.player_pic} />
            </TouchableOpacity>
            <View 
              style={[styles.innerProgressCompleted, {flex: flexCompleted}]}
              {...this._panResponder.panHandlers} />
            <View 
              style={[styles.innerProgressRemaining, {flex: flexRemaining}]}
              {...this._panResponder.panHandlers}/>
          </View>
        </View>
        <Loading ref={'loading'} />
      </View>
    );
  }
}

export default createForm()(VideoPage)