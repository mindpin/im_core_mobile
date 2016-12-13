import React from 'react';
import { Text, View, ListView, StyleSheet } from 'react-native';


import BasePage from 'im_core_mobile/app/component/base_page'

import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
import Navbar from 'im_core_mobile/app/component/nav_bar'
import API from 'API'

var styles = StyleSheet.create({
  references_name: {
    flex: 1, 
    paddingTop: 22,
    fontSize: 20,
  },
  references_tags: {
    flex: 1, 
    paddingTop: 22,
    fontSize: 15,
  }
});

class StudyPage extends BasePage {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(["1", "2", "3", "4", "5"]),
    }
  }

  componentDidMount() {
    API.auth.get_ref_detail().done((res_data, res)=>{
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        dataSource: ds.cloneWithRows(res_data['references']),
      }) 
    })
  }

  render(){
    return(
      <View>
        <Navbar titleContent={<Text style={{color: "#fff", fontSize: 20}}>学习</Text>}/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => 
            <View>
              <Text style={styles.references_name}>{rowData.name}</Text>
              <Text style={styles.references_tags}>{rowData.tags}</Text>
            </View>
          }
        />
      </View>
    )
  }
}export default StudyPage


