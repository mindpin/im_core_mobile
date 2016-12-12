import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  View
} from 'react-native';

import InputItem from 'antd-mobile/lib/input-item'
import Button from 'antd-mobile/lib/button'
import { createForm } from 'rc-form'

import API from 'API'


const styles = StyleSheet.create({
  input_item: {
    marginBottom: 20,
  }
});

class SignIn extends Component {
  sign_in() {
    let data = this.props.form.getFieldsValue(['email', 'password'])

    let post_data = {
      email: data.email,
      password: data.password
    }

    API.auth.sign_in(post_data).done((res_data, res)=>{
      if(res_data.valid_info == "successfully"){
       this.props.navigator.push({id: "UserDetail", params: {}})
      }else{
        Alert.alert('错误提示', res_data.valid_info, [{ text: '确定'}])
      }
    })
  }

  render() {
    const { getFieldProps } = this.props.form
    return (
      <View>
        <View>
          <InputItem 
            {...getFieldProps('email', {
              initialValue: 'user-001@test.com',
            })}
            style={styles.input_item}
            placeholder="邮箱"
          >
          </InputItem>
          <InputItem 
            {...getFieldProps('password',{
              initialValue: '',
            })}
            type = 'password'
            style={styles.input_item}
            placeholder="密码"
          >
          </InputItem>
        </View>
        <View>
          <Button 
            type="primary"
            style={styles.buttom_style}
            onClick={e => this.sign_in()}
          > 登录 </Button>
        </View>
      </View>
    );
  }
}


export default createForm()(SignIn)