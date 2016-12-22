import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView  
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
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    marginTop:5,
    marginBottom: 5, 
  },
});

class ImagePage extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      urls: [],
    }
  }

  componentDidMount() {
    this.get_loading().show()  
    API.auth.get_ref_files({id: this.props.id}).done((res_data, res)=>{
      this.get_loading().dismiss()
      this.setState({
        name: res_data["name"],
        urls: res_data["urls"],
      }) 
    })
  }

  get_loading() {
    return this.refs['loading']
  }

  render() {
    this.images_ary = []; 
    for(var i = 0; i < this.state.urls.length; i++){
      this.images_ary.push(
        <Image source={{uri: this.state.urls[i]}} style={[styles.image]} />
      )
    }
    return (
      <View style={styles.root}>
        <BackNavBar component={this}>{this.state.name}</BackNavBar>
        <ScrollView>
          {this.images_ary}
        </ScrollView>
        <Loading ref={'loading'} />
      </View>
    );
  }
}

export default createForm()(ImagePage)