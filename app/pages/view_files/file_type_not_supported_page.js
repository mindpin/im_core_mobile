import React from 'react';
import {
  StyleSheet,
  Text,
  View, 
} from 'react-native';

import { createForm } from 'rc-form'
import API from 'API'
import BasePage from 'im_core_mobile/app/component/base_page'

import BackNavBar from 'im_core_mobile/app/component/back_nav_bar'


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