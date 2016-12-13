import React from 'react';
import { Text, View, ListView, StyleSheet } from 'react-native';


import BasePage from 'im_core_mobile/app/component/base_page'

import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
import Navbar from 'im_core_mobile/app/component/nav_bar'
import API from 'API'

import Loading from 'im_core_mobile/app/component/loading'

var styles = StyleSheet.create({
  faq_question: {
    flex: 1, 
    paddingTop: 22,
    fontSize: 20,
  },
  faq_tags: {
    flex: 1, 
    paddingTop: 22,
    fontSize: 15,
  }
});


class FaqPage extends BasePage {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(["1", "2", "3", "4", "5"]),
    };
  }

  componentDidMount() {
    this.get_loading().show()  
    API.auth.get_faq_detail().done((res_data, res)=>{
      this.get_loading().dismiss()
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        dataSource: ds.cloneWithRows(res_data['faqs']),
      }) 
    })

  }

  get_loading() {
    return this.refs['loading']
  }

  render(){
    return(
      <View>
        <Navbar titleContent={<Text style={{color: "#fff", fontSize: 20}}>问答</Text>}/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => 
            <View>
              <Text style={styles.faq_question}>{rowData.question}</Text>
              <Text style={styles.faq_tags}>{rowData.tags}</Text>
            </View>
          }
        ></ListView>
        <Loading ref={'loading'} />
      </View>
    )
  }
}export default FaqPage


