import React from 'react'

import {
    Navigator,
} from 'react-native'
import FirstPage    from 'im_core_mobile/app/first_page'
import ErrorPage    from 'im_core_mobile/app/error_page'
import StudyPage    from 'im_core_mobile/app/study_page'
import SignIn       from 'im_core_mobile/app/pages/users/sign_in_page'
import UserDetail   from 'im_core_mobile/app/pages/users/detail_page'
import UserEdit     from 'im_core_mobile/app/pages/users/edit_page'


const ROUTE_MAP = {
  "FirstPage"   :           { component: FirstPage },
  "StudyPage"   :           { component: StudyPage } ,
  "SignIn"      :           {index: 0,  component: SignIn,          params: {}},
  "UserDetail"  :           {index: 1,  component: UserDetail,          params: {}},
  "UserEdit"    :           {index: 2,  component: UserEdit,          params: {}},

};


export default class App extends React.Component {
  render_scene (route, navigator) {
    let id         = route.id
    let route_item = ROUTE_MAP[id]

    if (route_item) {
        Component = route_item.component;
        route_params = {}
        //合并默认参数
        Object.assign(route_params, route_item.params || {}, route.params || {});
    } else {
        Component = ErrorPage;
        route_params = {data: {message: `当前页面没有找到：${id}`}}
    }
    return <Component navigator={navigator} {...route_params} />;
  }

  config_scene (route, routeStack) {
    if(route.config_scene_type == null){
      return Navigator.SceneConfigs.PushFromRight
      // return SceneConfig.PushFromRight;
    }
    return route.config_scene_type;
  }

  render() {
    return(
      <Navigator
        // 初始页面
        initialRoute={{
          id: 'SignIn',
          params: {}
        }}
        // 路由入口
        renderScene={this.render_scene.bind(this)}
        configureScene={this.config_scene.bind(this)}
      />
    );
  }
}