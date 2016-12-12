import React from 'react'

import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Platform,
} from 'react-native'

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
      backgroundColor: '#108EE9',
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
      paddingLeft: 15,
    },

    right: {
      position: "absolute",
      right: 15,
      top: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },

    title: {
    },

    text: {
      fontSize: 20,
    },

})

export default class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render_left() {
    if(this.props.leftContent){
      return (
        <View style={styles.left}>
          {this.props.leftContent}
        </View>
      )
    }else{
      return(
        <View style={styles.left}></View>
      )
    }

  }

  render_title() {
    if(this.props.titleContent){
      return(
        <View style={styles.title}>
          {this.props.titleContent}
        </View>
      )
    }else{
      return(
        <View style={styles.title}>
        </View>
      )
    }
  }

  render_right() {
    if(this.props.rightContent){
      return(
        <View style={styles.right}>
          {this.props.rightContent}
        </View>
      )
    }else{
      return(
        <View style={styles.right}>
        </View>
      )
    }
  }



  render() {
    let rootCustomStyles = {}
    if(this.props.backgroundColor != null){
      rootCustomStyles.backgroundColor = this.props.backgroundColor
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


