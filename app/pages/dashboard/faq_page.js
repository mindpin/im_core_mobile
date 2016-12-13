import React from 'react';
import { Text, View, ListView, StyleSheet } from 'react-native';


import BasePage from 'im_core_mobile/app/component/base_page'

import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
import Navbar from 'im_core_mobile/app/component/nav_bar'
import API from 'API'

import Loading from 'im_core_mobile/app/component/loading'

console.disableYellowBox = true;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1,
  },
  faq_question: {
    flex: 1, 
    fontSize: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  faq_tags: {
    flex: 1, 
    fontSize: 15,
    marginTop:5,
    marginBottom: 5,
  },
  listview_view_style: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 0.5,
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
      <View style={styles.root}>
        <Navbar titleContent={<Text style={{color: "#fff", fontSize: 20}}>问答</Text>}/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => 
            <View style={styles.listview_view_style}>
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


