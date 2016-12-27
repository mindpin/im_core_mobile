import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
} from 'react-native';

import {
  BasePage,
  BackNavBar,
  SearchInput,
  ConceptListView,
} from 'IcmComponent'

import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1,
  },
})


class ConceptList extends BasePage {
  constructor(props) {
    super(props)
  }

  load_more(current_data, add_new_data_callback) {
    setTimeout(()=>{
      add_new_data_callback([
        {book_title: "name1", author: "author1", price: "price1", book_category: "类别一"},
        {book_title: "name2", author: "author2", price: "price2", book_category: "类别二"},
      ])
    }, 2000)
  }

  render() {
    return (
      <View style={styles.root}>
        <BackNavBar
          // 可选参数
          rightContent={
            <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onPress={() => {
                // TODO https://mobile.ant.design/components/popover/
            }}>
              <Icon style={{flex: 1}} name="ellipsis-v" size={22} color={"#fff"} />
            </TouchableOpacity>

          }
          />
        <SearchInput style={{height: 100, width: 100}}/>
        <ConceptListView
          data={this.props.data}
          dimension_define={this.props.dimension_define}
          load_more={this.load_more.bind(this)}
        />
      </View>
    );
  }
}


export default ConceptList
