import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1,
  },
  row_view: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: "#aaa",
    flexDirection: "row",
  },
  row_c1: {
    flex: 1,
  },
  row_c2: {
    flex: 1,
  },
  row_c3: {
    flex: 1,
  },
  header_view: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: "#aaa",
    flexDirection: "row",
  },
  header_c1: {
    flex: 1
  },
  header_c2: {
    flex: 1
  },
  header_c3: {
    flex: 1
  },
  footer_view: {
    padding: 15,
    borderBottomWidth: 0.5,
    backgroundColor: "#0003",
    flexDirection: "row",
    justifyContent: "center",
  }
});

class ConceptListView extends React.Component {
  constructor(props) {
    super(props)
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this._data = Array.from(this.props.data)
    this.state = {
      dataSource: this.dataSource.cloneWithRows(this._data),
      isLoadingMore: false,
      isSort: true
    }
  }

  addNewData(newData){
    this._data = this._data.concat(newData)
    this.setState({
      isLoadingMore: false,
      dataSource: this.dataSource.cloneWithRows(this._data),
    })
  }

  field_sort(field_name) {
    tem_ary = this.props.data;
    change_boolean = this.state.isSort;
    this.setState({
      dataSource: this.dataSource.cloneWithRows(tem_ary.sort(
        function(o,p){
          if (typeof o === "object" && typeof p === "object" && o && p) {
            const a = o[field_name];
            const b = p[field_name];
            if (a === b) {
              return 0;
            }
            if (typeof a === typeof b) {
              if(change_boolean === false){
                return a > b ? -1 : 1;
              }else{
                return a < b ? -1 : 1;
              }
            }
            if(change_boolean === false){
              return typeof a > typeof b ? -1 : 1;
            }else{
              return typeof a < typeof b ? -1 : 1;
            }
          }else {
            throw ("error");
          }
        }
      )),
      isSort: !change_boolean
    });
  }

  renderRow(rowData) {
    return(
      <View style={styles.row_view}>
        <View style={styles.row_c1}>
          <Text>{rowData[this.props.dimension_define.name_fiels.field]}</Text>
        </View>
        <View style={styles.row_c2}>
          <Text>{rowData[this.props.dimension_define.dimension_fields[0].field]}</Text>
        </View>
        <View style={styles.row_c3}>
          <Text>{rowData[this.props.dimension_define.dimension_fields[1].field]}</Text>
        </View>
      </View>
    )
  }

  renderHeader() {
    return(
      <View style={styles.header_view}>
        <View style={styles.header_c1}>
          <TouchableOpacity onPress={() => {
            this.field_sort(this.props.dimension_define.name_fiels.field)
          }}>
            <Text>{this.props.dimension_define.name_fiels.label}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.header_c2}>
          <TouchableOpacity onPress={() => {
            this.field_sort(this.props.dimension_define.dimension_fields[0].field)
          }}>
            <Text>{this.props.dimension_define.dimension_fields[0].label}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.header_c3}>
          <TouchableOpacity onPress={() => {
            this.field_sort(this.props.dimension_define.dimension_fields[1].field)
          }}>
            <Text>{this.props.dimension_define.dimension_fields[1].label}</Text>
          </TouchableOpacity>
        </View>
      </View>

    )
  }

  renderFooter() {
    if(this.state.isLoadingMore){
      return(
        <View style={styles.footer_view}>
          <Text>正在加载...</Text>
        </View>
      )
    }else{
      return(
        <View></View>
      )
    }
  }

  onEndReached(evt) {
    if(evt === undefined){
      return;
    }

    this.setState({isLoadingMore: true})
    this.props.load_more(this._data, this.addNewData.bind(this))
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        renderHeader={this.renderHeader.bind(this)}
        renderFooter={this.renderFooter.bind(this)}
        onEndReached={this.onEndReached.bind(this)}
        onEndReachedThreshold={10}
        scrollRenderAheadDistance={10}
      />
    );
  }

}


export default ConceptListView
