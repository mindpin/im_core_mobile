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

import API from 'API'


const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1
  },
});

class FileTypeNotSupportedPage extends BasePage {
  render() {
    return (
      <View style={styles.root}>
        <BackNavBar component={this}>{this.props.name}</BackNavBar>
        <Text>文件类型不支持在线展示</Text>
      </View>
    );
  }
}

export default FileTypeNotSupportedPage