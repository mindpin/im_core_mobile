import React from 'react';
import { 
  Text, 
  View, 
  ListView, 
  StyleSheet,
  TouchableOpacity
} from 'react-native';


import BasePage from 'im_core_mobile/app/component/base_page'

import Button from 'antd-mobile/lib/button'
import InputItem from 'antd-mobile/lib/input-item'
import Navbar from 'im_core_mobile/app/component/nav_bar'
import API from 'API'

import Loading from 'im_core_mobile/app/component/loading'

console.disableYellowBox = true;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flex: 1,
  },
  references_name: {
    flex: 1, 
    fontSize: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  references_tags: {
    flex: 1, 
    fontSize: 15,
    marginTop:5,
    marginBottom: 5,
  },
  listview_view_style: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 0.5,
  },
});


class StudyPage extends BasePage {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    }
  }

  componentDidMount() {
    this.get_loading().show()  
    API.auth.get_ref_detail().done((res_data, res)=>{
      this.get_loading().dismiss()
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        dataSource: ds.cloneWithRows(res_data['references']),
      }) 
    })
  }

  get_loading() {
    return this.refs['loading']
  }

  render(){
    return(
      <View style={styles.root}>
        <Navbar titleContent={<Text style={{color: "#fff", fontSize: 20}}>学习</Text>}/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => 
            <View style={styles.listview_view_style}>
              <TouchableOpacity 
                onPress={()=> {
                  switch(rowData.kind){
                    case 'video':
                      this.props.navigator.push({
                        id: "VideoPage", params: {id: rowData.id}
                      }); 
                      break;
                    case "pdf":
                      this.props.navigator.push({
                        id: "ImagePage", params: {id: rowData.id}
                      });
                      break;
                    case "office":
                      this.props.navigator.push({
                        id: "ImagePage", params: {id: rowData.id}
                      });
                      break;
                    case "":
                      this.props.navigator.push({
                        id: "ReferenceFileNotExitedPage", params: {name: rowData.name}
                      }); 
                      break;
                    default:
                      this.props.navigator.push({
                        id: "FileTypeNotSupportedPage", params: {name: rowData.name}
                      });
                  }
                }}
              >
                <Text style={styles.references_name}>{rowData.name}</Text>
              </TouchableOpacity>
              <Text style={styles.references_tags}>{rowData.tags}</Text>
            </View>
          }
        ></ListView>
        <Loading ref={'loading'} />
      </View>
    )
  }
}export default StudyPage


