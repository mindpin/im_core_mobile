import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import InputItem from 'antd-mobile/lib/input-item'
import Button from 'antd-mobile/lib/button'
import { createForm } from 'rc-form'


const styles = StyleSheet.create({
  input_item: {
    marginBottom: 20
  },
  button_style: {
    marginBottom: 10
  }
});

class Edit extends Component {
  edit() {
    let data = this.props.form.getFieldsValue(['email', 'password'])
    this.props.navigator.push({id: "UserDetail", params: {}})
    console.log(data);
  }

  render() {
    const { getFieldProps } = this.props.form
    return (
      <View>
        <View>
          <InputItem 
            {...getFieldProps('email', {
              initialValue: 'Alan',
            })}
            style={styles.input_item}
            placeholder="请输入用户名"
          >用户名</InputItem>
          <InputItem 
            {...getFieldProps('password',{
              initialValue: '123456',
            })}
            style={styles.input_item}
            placeholder="请输入密码"
          >密码</InputItem>
        </View>
        <View>
          <Button 
            type="primary"
            style={styles.button_style}
            onClick={e => this.edit()}
          > 确认修改 </Button>
          <Button 
            type="primary"
            onClick={e => this.props.navigator.push({id: 'UserDetail', params: {}})}
          > 取消 </Button>
        </View>
      </View>
    );
  }
}


export default createForm()(Edit)