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
import Popover from 'antd-mobile/lib/popover'

const Item = Popover.Item;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1,
  },
})


class ConceptList extends BasePage {
  constructor(props) {
    super(props)
    this.state = {
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

  render() {
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
          data={this.props.data}
          dimension_define={this.props.dimension_define}
          load_more={this.load_more.bind(this)}
        />
      </View>
    );
  }
}


export default ConceptList
