import React from 'react'

import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#F5F5F9",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    color: "#000",
  }
});

/**
*  开发过程中，便于发现路由跳转错误的错误页面
*  by fushang318
*/
export default class ErrorPage extends React.Component {
  render() {
    return(
      <View style={styles.root}>
        <Text style={styles.text}>{this.props.data.message}</Text>
      </View>
    )
  }
}
