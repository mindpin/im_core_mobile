import React from 'react';
import {
  StyleSheet,
  Text,
  View, 
} from 'react-native';
import { createForm } from 'rc-form'
import {
  BasePage,
  BackNavBar,
} from 'IcmComponent'

import Button from 'antd-mobile/lib/button'
import API from 'API'

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1
  },
});

class ReferenceFileNotExistPage extends BasePage {
  render() {
    return (
      <View style={styles.root}>
        <BackNavBar component={this}>{this.props.name}</BackNavBar>
        <Text>没有引用任何文件</Text>
      </View>
    );
  }
}

export default ReferenceFileNotExistPage