import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import InputItem from 'antd-mobile/lib/input-item'
import Button from 'antd-mobile/lib/button'

const styles = StyleSheet.create({
  input_item: {
    marginBottom: 20
  },
  button_style: {
    marginBottom: 10
  }
});

export default class Detail extends Component {
  render() {
    return (
      <View>
        <View>
          <InputItem 
            style={styles.input_item}
            value="alan814@163.com"
            editable={false}
          >邮箱</InputItem>
          <InputItem 
            style={styles.input_item}
            value="Alan"
            editable={false}
          >用户名</InputItem>
          <InputItem 
            style={styles.input_item}
            value="机构一"
            editable={false}
          >组织机构</InputItem>
          <InputItem 
            style={styles.input_item}
            value="机构二"
            editable={false}
          >组织机构</InputItem>
        </View>
        <View>
          <Button 
            type="primary"
            style={styles.button_style}
            onClick={e => this.props.navigator.push({id: "UserEdit", params: {}})}
          > 修改个人信息 </Button>
          <Button 
            type="primary"
            style={styles.button_style}
            onClick={e => this.props.navigator.push({id: "FirstPage", params: {}})}
          > 学习 </Button>
          <Button 
            type="primary"
          > 退出 </Button>
        </View>
      </View>
    );
  }
}