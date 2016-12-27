import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Span,
} from 'react-native';

import {
  BasePage,
  BackNavBar,
  SearchInput,
  ConceptListView,
} from 'IcmComponent'

import Icon from 'react-native-vector-icons/FontAwesome'

import Button from 'antd-mobile/lib/button'

import Popover from 'antd-mobile/lib/popover'
const Item = Popover.Item;


const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1,
  },
  check_class_bar: {
    backgroundColor: "blue",
    flexWrap:'wrap',
    flexDirection:'row',
  },
  check_class_bar_btn_checked: {
    backgroundColor: "red",
    width:90,
    margin:5,
  },
  check_class_bar_btn_unchecked: {
    backgroundColor: "#fff",
    width:90,
    margin:5,
  },

})


class ConceptList extends BasePage {
  constructor(props) {
    super(props)
    this.state = {
      checked_class:[],
      list_data:this.props.data,
      visible: true,
      selected: '',
    }
  }

  onSelect(opt) {
    this.setState({
      visible: false,
      selected: opt,
    });
  }

  handleVisibleChange(visible) {
    this.setState({
      visible,
    });
  }

  load_more(current_data, add_new_data_callback) {
    setTimeout(()=>{
      add_new_data_callback([
        {book_title: "name1", author: "author1", price: "price1", book_category: "类别一"},
        {book_title: "name2", author: "author2", price: "price2", book_category: "类别二"},
      ])
    }, 2000)
  }

  add_class(e){
    index = this.state.checked_class.indexOf(e)
    new_ary = this.state.checked_class

    if(index == -1){
      new_ary.push(e)
      found_result = this.find_data(new_ary)
      this.setState({ checked_class: new_ary,list_data:found_result})}
    else{
      new_ary.splice(index,1)
      found_result = this.find_data(new_ary)
      this.setState({ checked_class: new_ary,list_data:found_result})}

  }

  find_data(strs){
    all_data = this.props.data
    result = []
    // 遍历所有数据
    if(strs.length != 0){
      for(var i=0;i<all_data.length;i++){
        if(strs.indexOf(all_data[i].book_category)!= -1){result.push(all_data[i])}
      }
    }else{
      return(all_data)
    }
    return(result)
  }

  render() {
    console.log(this.state.checked_class)
    console.log(this.state.list_data)

    let list_data = this.state.list_data

    this.class_doms = [];
    let class_names = {}
    for(let i=0; i<this.props.data.length; i++){
      class_names[this.props.data[i].book_category] = true
    }

    for(let i=0; i<Object.keys(class_names).length; i++){

      if(this.state.checked_class.indexOf(Object.keys(class_names)[i]) == -1){
        this.class_doms.push(<Button
        onClick={() => this.add_class(Object.keys(class_names)[i])}
        style={styles.check_class_bar_btn_unchecked}>
        {Object.keys(class_names)[i]}
        </Button>)
      }else{
        this.class_doms.push(<Button
        onClick={() => this.add_class(Object.keys(class_names)[i])}
        style={styles.check_class_bar_btn_checked}>
        {Object.keys(class_names)[i]}
        </Button>)
      }
    }
    
    let offsetX = -30;
    return (
      <View style={styles.root}>
        <BackNavBar
          // 可选参数
          rightContent={
            <Popover mask
              visible={this.state.visible}
              overlay={[
                (<Item key="4" value="scan" iconName="scan" data-seed="logId"><Text>扫一扫</Text></Item>),
                (<Item key="5" value="special" iconName="qrcode"><Text>我的二维码</Text></Item>),
                (<Item key="6" value="button ct" iconName="question-circle-o">
                  <Text style={{ marginRight: 5 }}>帮助</Text>
                </Item>),
              ]}
              popupAlign={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [offsetX, 15],
              }}
              onVisibleChange={this.handleVisibleChange}
              onSelect={this.onSelect.bind(this)}
            >
              <Text>123</Text>
            </Popover>
          }/>
        <SearchInput style={{height: 100, width: 100}}/>
        <ConceptListView
          data={this.state.list_data}
          dimension_define={this.props.dimension_define}
          load_more={this.load_more.bind(this)}
        />

        <View style={styles.check_class_bar}>
          {this.class_doms}
        </View>
      </View>
    );
  }
}


export default ConceptList
