import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  View
} from 'react-native';
import { createForm } from 'rc-form'
import { Loading } from 'IcmComponent'

import InputItem from 'antd-mobile/lib/input-item'
import Button from 'antd-mobile/lib/button'
import API from 'API'


const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1,
  },
  input_item: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  button_style: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  }
});

class SignIn extends Component {
  sign_in() {
    this.get_loading().show()
    let data = this.props.form.getFieldsValue(['email', 'password'])

    let post_data = {
      email: data.email,
      password: data.password
    }

    API.auth.sign_in(post_data).done((res_data, res)=>{
      if(res_data.valid_info == "successfully"){
        this.get_loading().dismiss()
        this.props.navigator.replace({id: "Dashboard"})
      }else{
        this.get_loading().dismiss()
        Alert.alert('错误提示', res_data.valid_info, [{ text: '确定'}])
      }
    })
  }

  get_loading() {
    return this.refs['loading']
  }

  render() {
    const { getFieldProps } = this.props.form
    return (
      <View style={styles.root}>
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
            style={styles.button_style}
            onClick={e => this.sign_in()}
          > 登录 </Button>
        </View>
        <Loading ref={'loading'} />
      </View>
    );
  }
}


export default createForm()(SignIn)