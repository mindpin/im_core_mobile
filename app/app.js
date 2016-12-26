import React from 'react'

import {
    Navigator,
} from 'react-native'

import ROUTE_MAP from 'IcmRouteMap'


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
          id: 'ConceptList',
          params: {
            dimension_define: {
              name_fiels: {
                field: 'book_title',
                label: '书名'
              },
              dimension_fields: [
                {
                  field: 'author',
                  label: '作者',
                },
                {
                  field: 'price',
                  label: '价格',
                },
              ]
            },
            data: [
              {book_title: "name1", author: "author1", price: "price1"},
              {book_title: "name2", author: "author2", price: "price2"},
              {book_title: "name3", author: "author3", price: "price3"},
              {book_title: "name4", author: "author4", price: "price4"},
              {book_title: "name5", author: "author5", price: "price5"},
              {book_title: "name6", author: "author6", price: "price6"},
            ]
          }
        }}
        // 路由入口
        renderScene={this.render_scene.bind(this)}
        configureScene={this.config_scene.bind(this)}
      />
    );
  }
}
