import React from 'react';
import { Text, View } from 'react-native';


import BasePage from 'im_core_mobile/app/component/base_page'

import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
import Navbar from 'im_core_mobile/app/component/nav_bar'
import API from 'API'

class FaqPage extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      faqs : [],
    }
  }

  componentDidMount() {
    API.auth.get_faq_detail().done((res_data, res)=>{
      console.log(res_data)
      this.setState({
        faqs: res_data['faqs'],
      }) 
    })

  }

  render(){
    this.doms_ary = []; 
    tag_s = '';
    console.log(this.state.faqs.length);
    for(var i=0; i<this.state.faqs.length; i++){
      for(var j=0; j<this.state.faqs[i].tags.length; j++){
        tag_s += this.state.faqs[i].tags[j] + ","
      }
      this.doms_ary.push(
        <View key={i}>
          <Text key={this.state.faqs[i].question}>{this.state.faqs[i].question}</Text>
          <InputItem 
            value={tag_s}
            key={i}
            editable={false}
          >
          </InputItem>
        </View>
      )
    }
    return(
      <View>
        <Navbar titleContent={<Text style={{color: "#fff", fontSize: 20}}>问答</Text>}/>
        {this.doms_ary}
      </View>
    )
  }
}export default FaqPage


