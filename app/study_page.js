import React from 'react';
import { Text, View } from 'react-native';


import BasePage from 'im_core_mobile/app/base_page'

import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
import Navbar from 'im_core_mobile/app/component/nav_bar'

class StudyPage extends BasePage {
  constructor(props) {
    super(props);
  }

  render(){
    return(
          <View>
          <Navbar titleContent={<Text style={{color: "#fff", fontSize: 20}}>学习</Text>}/>

          <Text>参考资料</Text>
          <InputItem 
            value="abdj@sina.com"
            name="phone"
          >
          </InputItem>
          
          </View>
    )
  }
}export default StudyPage


