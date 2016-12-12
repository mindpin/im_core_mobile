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
import API from 'API'



const styles = StyleSheet.create({
  input_item: {
    marginBottom: 20
  },
  button_style: {
    marginBottom: 10
  }
});

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name : "",
      password: "",
    }
  }

  componentDidMount() {
    API.auth.get_user_detail().done((res_data, res)=>{
      this.setState({
        name: res_data['name'],
        password: res_data['password'],
      }) 
    })
  }

  edit() {
    let data = this.props.form.getFieldsValue(['name', 'password'])

    API.auth.update_user(data).done((res_data, res)=>{
      if(res_data.status_code == "200"){
       this.props.navigator.push({id: "Dashboard", params: {}})
      }else{
        Alert.alert('错误提示', "修改失败", [{ text: '确定'}])
      }
    })
  }

  render() {
    const { getFieldProps } = this.props.form
    return (
      <View>
        <View>
          <InputItem 
            {...getFieldProps('name', {
              initialValue: this.state.name,
            })}
            style={styles.input_item}
            placeholder="请输入用户名"
          >用户名</InputItem>
          <InputItem 
            {...getFieldProps('password',{
              initialValue: this.state.password,
            })}
            style={styles.input_item}
            placeholder="请输入新密码"
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
            onClick={e => this.props.navigator.push({id: 'Dashboard', params: {}})}
          > 取消 </Button>
        </View>
      </View>
    );
  }
}


export default createForm()(Edit)