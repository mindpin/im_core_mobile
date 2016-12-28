import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'

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
    flex: 1,
    flexDirection: "row",
  },
  header_c2: {
    flex: 1,
    flexDirection: "row",
  },
  header_c3: {
    flex: 1,
    flexDirection: "row",
  },
  footer_view: {
    padding: 15,
    borderBottomWidth: 0.5,
    backgroundColor: "#0003",
    flexDirection: "row",
    justifyContent: "center",
  },
  sort_icon:{
    marginTop: 5,
  }
});

const SORT_TYPE = {
  UP: "UP",
  DOWN: "DOWN",
  NONE: "NONE",
}

class ConceptListView extends React.Component {
  constructor(props) {
    super(props)
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this._data = Array.from(this.props.data)
    this.state = {
      dataSource: this.dataSource.cloneWithRows(this._data),
      isLoadingMore: false,
      bookSortType: SORT_TYPE.NONE,
      authSortType: SORT_TYPE.NONE,
      priceSortType: SORT_TYPE.NONE,
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
    let item_array = this.props.data;
    let sort_type = '';
    let next_book_sort_type = 'NONE';
    let next_auth_sort_type = 'NONE';
    let next_price_sort_type = 'NONE';
    if(field_name == this.props.dimension_define.name_fiels.field){
      next_book_sort_type = this.get_next_sort_type(this.state.bookSortType)
      sort_type = next_book_sort_type;
    }
    if(field_name == this.props.dimension_define.dimension_fields[0].field){
      next_auth_sort_type = this.get_next_sort_type(this.state.authSortType)
      sort_type = next_auth_sort_type;
    }
    if(field_name == this.props.dimension_define.dimension_fields[1].field){
      next_price_sort_type = this.get_next_sort_type(this.state.priceSortType)
      sort_type = next_price_sort_type;
    } 

    this.setState({
      dataSource: this.dataSource.cloneWithRows(item_array.sort((o,p)=>{
        return this.data_sort(o,p, field_name, sort_type)
      })),
      bookSortType: next_book_sort_type,
      authSortType: next_auth_sort_type,
      priceSortType: next_price_sort_type,
    });
  }

  get_next_sort_type(type) {
    let types = [SORT_TYPE.UP, SORT_TYPE.DOWN]
    let index = types.indexOf(type)
    let next_index = (index + 1) % 2
    return types[next_index]
  }

  data_sort(o, p, field_name, sort_type) {
    let a = o[field_name];
    let b = p[field_name];

    if (a === b) {
      return 0;
    }

    if(sort_type === SORT_TYPE.DOWN){
      return a > b ? -1 : 1;
    }else if(sort_type === SORT_TYPE.UP){
      return a > b ? 1 : -1;
    }

    return 0;
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

  pic_type(type){
    let pic_type_ary = [];
    if(type == SORT_TYPE.UP){
      pic_type_ary.push(
        <Icon name="sort-asc" style={styles.sort_icon}/>
      )
    }else if(type == SORT_TYPE.DOWN){
      pic_type_ary.push(
        <Icon name="sort-desc" style={styles.sort_icon}/>
      )
    }else if(type == SORT_TYPE.NONE){
      pic_type_ary.push(
        <Icon name="sort" style={styles.sort_icon}/>
      )
    }
    return pic_type_ary;
  }

  renderHeader() {
    let book_icon_ary = [];
    let auth_icon_ary = [];
    let price_icon_ary = [];
    if (this.props.dimension_define.name_fiels.field == "book_title") {
      book_icon_ary = this.pic_type(this.state.bookSortType);
    }
    if (this.props.dimension_define.dimension_fields[0].field == "author") {
      auth_icon_ary = this.pic_type(this.state.authSortType);
    }
    if (this.props.dimension_define.dimension_fields[1].field == "price") {
      price_icon_ary = this.pic_type(this.state.priceSortType);
    }

    return(
      <View style={styles.header_view}>
        <View style={styles.header_c1}>
          <TouchableOpacity 
            style={styles.header_c1}
            onPress={() => {
              this.field_sort(this.props.dimension_define.name_fiels.field)
            }}
          >
            <Text>{this.props.dimension_define.name_fiels.label}</Text>
            {book_icon_ary}
          </TouchableOpacity>
        </View>
        <View style={styles.header_c2}>
          <TouchableOpacity 
            style={styles.header_c2}
            onPress={() => {
              this.field_sort(this.props.dimension_define.dimension_fields[0].field)
            }}
          >
            <Text>{this.props.dimension_define.dimension_fields[0].label}</Text>
            {auth_icon_ary}
          </TouchableOpacity>
        </View>
        <View style={styles.header_c3}>
          <TouchableOpacity 
            style={styles.header_c3}
            onPress={() => {
              this.field_sort(this.props.dimension_define.dimension_fields[1].field)
            }}
          >
            <Text>{this.props.dimension_define.dimension_fields[1].label}</Text>
            {price_icon_ary}
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
