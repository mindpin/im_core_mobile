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
  }
});

class SignIn extends Component {
  sign_in() {
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
              initialValue: '',
            })}
            style={styles.input_item}
            placeholder="邮箱"
          >
          </InputItem>
          <InputItem 
            {...getFieldProps('password',{
              initialValue: '',
            })}
            style={styles.input_item}
            placeholder="密码"
          >
          </InputItem>
        </View>
        <View>
          <Button 
            type="primary"
            onClick={e => this.sign_in()}
          > 登录 </Button>
        </View>
      </View>
    );
  }
}


export default createForm()(SignIn)