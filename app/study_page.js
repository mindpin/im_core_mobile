import React from 'react';
import { Text, View } from 'react-native';


import BasePage from 'im_core_mobile/app/base_page'

import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
// navbar 不能用
import NavbarBtn from 'antd-mobile/lib/button'
class StudyPage extends BasePage {
  constructor(props) {
    super(props);
  }

  render(){
    return(
          <View>
          <NavbarBtn>学习</NavbarBtn>

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


