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
        />
      </View>
    );
  }
}


export default ConceptList
