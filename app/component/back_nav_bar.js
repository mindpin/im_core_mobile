import React from 'react'

import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Platform,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import DEFAULT_STYLES from 'im_core_mobile/app/constants/default_styles'

const styles = StyleSheet.create({
    root: {
      ...Platform.select({
        android:{
          height: 54,
        },
        ios:{
          paddingTop: 0,
          height: 64,
        }
      }),
      backgroundColor: DEFAULT_STYLES.BackNavBar.backgroundColor,
    },
    status: {
      ...Platform.select({
        android:{
          height: 0,
        },
        ios:{
          height: 20,
        }
      }),
      backgroundColor:'black',
    },

    content: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },

    left: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },

    left_touch_box: {
      position: "absolute",
      top: 0,
      bottom: 0,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 15,
      paddingRight: 15,
    },

    right:{
      position: "absolute",
      right: 15,
      top: 0,
      bottom: 0,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },

    title: {
    },

    text: {
      fontSize: 16,
    },

})

/**
*  带有后退按钮的顶部导航栏，会逐渐完善成通用组件
*  by fushang318
*/
export default class BackNavBar extends React.Component {
  constructor(props) {
    super(props)
  }

  back(){
    if(this.props.onBack){
      return this.props.onBack()
    }

    if(this.props.component.___on_back){
      return this.props.component.___on_back()
    }

    this.props.navigator.pop()
    return true
  }

  render_left() {
    let backTextColor = this.props.backTextColor || DEFAULT_STYLES.BackNavBar.backTextColor
    return (
      <View style={styles.left}>
        <TouchableOpacity 
          style={styles.left_touch_box} 
          onPress={() => {this.back()}}
        >
          <Icon style={{marginRight: 3}} name="angle-left" size={22} color={backTextColor} />
          <Text style={{fontSize: 16, color: backTextColor}}>
            {this.props.backText || "返回"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render_title() {
    let titleCustomStyles = {
      color: this.props.titleColor || DEFAULT_STYLES.BackNavBar.titleColor
    }

    if(this.props.children){
      return(
        <View style={styles.title}>
          <Text style={[styles.text, titleCustomStyles]}>{this.props.children}</Text>
        </View>
      );
    }else{
      return (
        <View style={styles.title}></View>
      );
    }
  }

  render_right() {
    if(this.props.rightContent){
      return(
        <View style={styles.right}>
          {this.props.rightContent}
        </View>
      )
    }
  }

  render() {
    let rootCustomStyles = {
      backgroundColor: this.props.backgroundColor || DEFAULT_STYLES.BackNavBar.backgroundColor,
    }

    return (
      <View style={[styles.root, rootCustomStyles]}>
        <View style={styles.status}></View>
        <View style={styles.content}>
          {this.render_left()}
          {this.render_title()}
          {this.render_right()}
        </View>
      </View>
    )
  }
}
