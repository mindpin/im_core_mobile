import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import CommonStyle from 'im_core_mobile/app/component/commonStyle';

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    backgroundColor: CommonStyle.TABBAR_COLOR,
  },
  touchableContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 25,
    height: 25
  },
  text: {
    fontSize:10
  }
});


const TAB_BAR_COLOR1 = [
  '#ce9f66','#ffffff','#ffffff','#ffffff'
];
const TAB_BAR_COLOR2 = [
  '#ffffff','#ce9f66','#ffffff','#ffffff'
];
const TAB_BAR_COLOR3 = [
  '#ffffff','#ffffff','#ce9f66','#ffffff'
];
const TAB_BAR_COLOR4 = [
  '#ffffff','#ffffff','#ffffff','#ce9f66'
];

class TabBar extends React.Component {

  constructor(props) {
    super(props);
    if (props.tabBarResources.length !== props.tabs.length) {
      console.warn('ScrollableTabView TabBar config error, please check');
    }
    this.state = {
      title_color : true,
      tab_index : 0,
      color_array : TAB_BAR_COLOR1
    }
  }

  on_press(index,navigator,goToPage) {
    this.setState({title_color:!this.state.title_color});
    if (index == 0) {
      this.setState({color_array: TAB_BAR_COLOR1});
      goToPage(0);
    }
    if (index == 1) {
      this.setState({color_array: TAB_BAR_COLOR2});
      goToPage(1);
    }
    if (index == 2) {
      this.setState({color_array: TAB_BAR_COLOR3});
      goToPage(2);
    }
    if (index == 3) {
      this.setState({color_array: TAB_BAR_COLOR4});
      goToPage(3);
    }


  }

  render() {
    const {
      tabBarResources,
      activeTab,
      tabs,
      goToPage,
      tabBarTitle,
      navigator,
    } = this.props;

    return (
      <View style={styles.container}>
        {
          tabs.map((tab, index) => {
            return (
              <TouchableOpacity style={styles.touchableContainer} key={index} onPress={() => {this.on_press(index,navigator,goToPage)}} activeOpacity={1} >
                <Image style={styles.image} source={tabBarResources[index][activeTab === index ? 1 : 0]}/>
                <Text style={[styles.text,{color:this.state.color_array[index]}]}>{tabBarTitle[index]}</Text>
              </TouchableOpacity>
            );
          })
        }
      </View>
    );
  }

};

TabBar.propTypes = {
  tabBarResources: React.PropTypes.array.isRequired,//图片资源二维数组
  activeTab: React.PropTypes.number,
  tabs: React.PropTypes.array,
  tabBarTitle: React.PropTypes.array.isRequired,
};

export default TabBar;


