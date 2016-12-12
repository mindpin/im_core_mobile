import React from 'react';
import { Text, View } from 'react-native';


import BasePage from 'im_core_mobile/app/component/base_page'

import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
import Navbar from 'im_core_mobile/app/component/nav_bar'

class FaqPage extends BasePage {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <View>
        <Navbar titleContent={<Text style={{color: "#fff", fontSize: 20}}>问答</Text>}/>

        <Text>FAQ1</Text>
        <InputItem 
          value="abdj@sina.com"
          name="phone"
        >
        </InputItem>
      
      </View>
    )
  }
}export default FaqPage


