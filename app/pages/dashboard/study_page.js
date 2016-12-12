import React from 'react';
import { Text, View } from 'react-native';


import BasePage from 'im_core_mobile/app/component/base_page'

import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
import List from 'antd-mobile/lib/list'
import Navbar from 'im_core_mobile/app/component/nav_bar'

const Item = List.Item;
const Brief = Item.Brief;

class StudyPage extends BasePage {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <View>
        <Navbar titleContent={<Text style={{color: "#fff", fontSize: 20}}>学习</Text>}/>
        <View>
          <Text>参考资料</Text>
          <InputItem 
            value="abdj@sina.com"
            name="phone"
            editable={false}
          >
          </InputItem>
        </View>
        <View>
          <Text>参考资料2</Text>
          <InputItem 
            value="abdj@sina.com"
            name="phone"
            editable={false}
          >
          </InputItem>
        </View>
      </View>
    )
  }
}export default StudyPage


