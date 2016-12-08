import React from 'react';
import { Text, View } from 'react-native';


import BasePage from 'im_core_mobile/app/base_page'

import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
import Navbar from 'im_core_mobile/app/component/nav_bar'

class FirstPage extends BasePage {
  constructor(props) {
    super(props);

    orgs = ["阿萨德","真主党","ISIS"]
    this.doms_ary = []; 

    for(var i=0;i<orgs.length;i++){
     this.doms_ary.push(
      <InputItem
      type="org"
      value={orgs[i]}>
      组织机构:
      </InputItem>
      )
    };
   }

  sign_out(){

  }

  update(){

  }

  render() {
        return (
          <View>
          <Navbar titleContent={<Text style={{color: "#fff", fontSize: 20}}>用户信息</Text>}/>

          <InputItem 
            value="abdj@sina.com"
            name="phone"
          >
          邮箱:
          </InputItem>

          <InputItem
            value="阿普杜江"
          >
          用户名:
          </InputItem>
      
          {this.doms_ary}

          <Button
            type="primary"
             onClick={e => this.update()}
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
             onClick={e => this.props.navigator.push({id: "StudyPage", params: {a: 233, b: "xxx"}})}
          >
          跳转至学习页面
          </Button>
      

        </View>

          );
    }
};
export default FirstPage
