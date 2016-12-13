import React from 'react';
import { Text, View } from 'react-native';

import BasePage from 'im_core_mobile/app/component/base_page'

import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
import Navbar from 'im_core_mobile/app/component/nav_bar'
import API from 'API'

import Dashboard from 'im_core_mobile/app/pages/dashboard'
import Loading from 'im_core_mobile/app/component/loading'

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
    this.get_loading().show()
    API.auth.get_user_detail().done((res_data, res)=>{
      this.get_loading().dismiss()
      this.setState({
        organizations: res_data['organizations'],
        name: res_data['name'],
        email: res_data['email'],
      }) 
    })

  }

  sign_out(){
    this.get_loading().show()
    API.auth.sign_out().done((res_data, res)=>{
      if(res_data.status_code == "200"){
        this.get_loading().dismiss()
        this.props.navigator.replace({id: "SignIn", params: {}})
      }
    })

  }

  get_loading() {
    return this.refs['loading']
  }

  render() {
    this.doms_ary = []; 
    for(var i=0; i<this.state.organizations.length; i++){
      this.doms_ary.push(
        <InputItem
          type="org"
          key={i}
          value={this.state.organizations[i]}
        >
          组织机构:
        </InputItem>
      )
    }

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
        <Loading ref={'loading'} />
      </View>
    );
  }
};
export default DetailPage
