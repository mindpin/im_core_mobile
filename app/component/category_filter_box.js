
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Button from 'antd-mobile/lib/button'

const styles = StyleSheet.create({
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

class CategoryFilterBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked_class:[],
      list_data:this.props.data,
    }
  }

  add_class(e){
    let index = this.state.checked_class.indexOf(e)
    let new_ary = this.state.checked_class

    if(index == -1){
      new_ary.push(e)
      found_result = this.find_data(new_ary)
      this.setState({ checked_class: new_ary,list_data:found_result})
    }else{
      new_ary.splice(index,1)
      found_result = this.find_data(new_ary)
      this.setState({ checked_class: new_ary,list_data:found_result})
    }
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

    return (
      <View style={styles.check_class_bar}>
        {this.class_doms}
      </View>
    )

  }
}

export default CategoryFilterBox
