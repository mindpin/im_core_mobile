import React from 'react';
import { Text, View } from 'react-native';

import BasePage from 'im_core_mobile/app/base_page'

import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
import Navbar from 'im_core_mobile/app/component/nav_bar'
import API from 'API'

class DetailPage extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      organizations : [],
      name : "",
      email: "",
    }
   }

  componentDidMount() {
    API.auth.get_user_detail().done((res_data, res)=>{
      this.setState({
        organizations: res_data['organizations'],
        name: res_data['name'],
        email: res_data['email'],
      }) 
    })

  }

  sign_out(){
    API.auth.sign_out().done((res_data, res)=>{

      if(res_data.status_code == "200"){
       this.props.navigator.push({id: "SignIn", params: {}})
      }
    })

  }



  render() {
    this.doms_ary = []; 
    for(var i=0; i<this.state.organizations.length; i++){
        this.doms_ary.push(
        <InputItem
        type="org"
        value={this.state.organizations[i]}>
        组织机构:
        </InputItem>
        )
    };

        return (
          <View>
          <Navbar titleContent={<Text style={{color: "#fff", fontSize: 20}}>用户信息</Text>}/>

          <InputItem 
            value={this.state.email}
          >
          邮箱:
          </InputItem>

          <InputItem
            value={this.state.name}
          >
          用户名:
          </InputItem>
      
          {this.doms_ary}

          <Button
            type="primary"
             onClick={e => this.props.navigator.push({id: "UserEdit"})}
          >
          修改个人信息
          </Button>

          <Button
            type="primary"
             onClick={e => this.sign_out()}
          >
          登出
          </Button>

          <Button
            type="primary"
             onClick={e => this.props.navigator.push({id: "StudyPage"})}
          >
          跳转至学习页面
          </Button>
      
        
        </View>

          );
    }
};
export default DetailPage
