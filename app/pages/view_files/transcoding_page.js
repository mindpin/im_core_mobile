import React from 'react';
import {
  StyleSheet,
  Text,
  View, 
} from 'react-native';

import Button from 'antd-mobile/lib/button'
import { createForm } from 'rc-form'
import API from 'API'
import BasePage from 'im_core_mobile/app/component/base_page'

import Loading from 'im_core_mobile/app/component/loading'
import BackNavBar from 'im_core_mobile/app/component/back_nav_bar'


const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1
  },
});

class ImagePage extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    }
  }

  componentDidMount() {
    this.get_loading().show()  
    API.auth.get_ref_files({id: this.props.id}).done((res_data, res)=>{
      this.get_loading().dismiss()
      this.setState({
        name: res_data["name"],
      }) 
    })
  }

  get_loading() {
    return this.refs['loading']
  }

  render() {
    return (
      <View style={styles.root}>
        <BackNavBar component={this}>{this.state.name}</BackNavBar>
        <Text>文件类型不支持在线展示</Text>
        <Loading ref={'loading'} />
      </View>
    );
  }
}

export default createForm()(TranscodingPage)