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
    marginBottom: 20
  }
});

class SignIn extends Component {
  sign_in() {
    let data = this.props.form.getFieldsValue(['email', 'password'])

    let post_data = {
      eamil: data.email,
      password: data.password
    }

    API.auth.sign_in(post_data).done((res_data, res)=>{
      console.log(res_data);
      // if(res_data.retCode == 1){
      //   AsyncStorage.setItem(StorageKeys.SIGN_TOKEN, JSON.stringify(res_data), (error)=>{
      //     this.get_loading().dismiss()
      //     this.props.my_center.state.isReload = true
      //     NavigatorUtils.pop_to_route(
      //       this.props.navigator,
      //       {id: 'Dashboard'}
      //     )
      //   })
      // }else{
      //   this.get_loading().dismiss()
      //   Alert.alert('错误提示', res_data.retMsg, [{ text: '确定'}])
      // }
    })


    // this.props.navigator.push({id: "UserDetail", params: {}})
    // console.log(data);
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