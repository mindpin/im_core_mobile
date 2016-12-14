import React from 'react'

import {
  Text,
  View,
  StyleSheet,
  Image,
  TabBarIOS
} from 'react-native'

import BasePage from 'im_core_mobile/app/component/base_page'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'im_core_mobile/app/component/tabBar';
import UserDetail from 'im_core_mobile/app/pages/dashboard/detail_page'
import Study from 'im_core_mobile/app/pages/dashboard/study_page'
import Faq from 'im_core_mobile/app/pages/dashboard/faq_page'

const styles = StyleSheet.create({
  /**
   * iOS平台下, react-native-scrollable-tab-view是用ScrollView实现的
   * 当react-native-scrollable-tab-view嵌套react-native-viewpager时, 需要给react-native-scrollable-tab-view的子View设置overflow='hidden',
   * ScrollView的removeClippedSubviews才能起作用, 将不在屏幕可视范围的视图移除掉.
   */
  subView: {
    overflow: 'hidden'
  }
});

//tabbar图片资源
const TAB_BAR_RESOURCES = [
  [],
  [],
  [],
];

const TAB_BAR_TITLE = [
  '用户信息','学习','问答',
];

class Dashboard extends BasePage {
  constructor(props) {
    super(props)
  }

  render() {
    // ios 下 tabbar icon 大小不能自适应，先临时用一个占位
    return (
        <ScrollableTabView
        tabBarPosition="bottom"
        locked={true}
        scrollWithoutAnimation={true}
        prerenderingSiblingsNumber={3}
        renderTabBar={() => {
          /*使用自定义tabbar*/
          return <TabBar tabBarResources={TAB_BAR_RESOURCES} tabBarTitle={TAB_BAR_TITLE} navigator={this.props.navigator} />
        }}>
        <UserDetail style={styles.subView} navigator={this.props.navigator} />
        <Study style={styles.subView} navigator={this.props.navigator} />
        <Faq style={styles.subView} navigator={this.props.navigator}/>
      </ScrollableTabView>

    )
  }


}

export default Dashboard