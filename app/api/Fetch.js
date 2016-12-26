/*
 * @providesModule APIFetch
 */

'use strict';

import {
  Alert,
  AsyncStorage,
} from 'react-native'


import StorageKeys from 'im_core_mobile/app/constants/storage_keys'


export default {

  get (url, data = {}) {
    return this.request("GET", url, data, "query")
  },

  post (url, data = {}) {
    return this.request("POST", url, data, "form_data")
  },

  put (url, data = {}) {
    return this.request("PUT", url, data, "form_data")
  },

  delete (url, data = {}) {
    return this.request('DELETE', url, data, "form_data")
  },

  request (method, url, data = {}, data_type) {
    let promise = new FetchPromise()
    AsyncStorage.getItem(StorageKeys.SIGN_TOKEN, (error, value)=>{
      let hash = JSON.parse(value)

      if(!!hash && !!hash.tokenVO && !!hash.tokenVO.token){
        data["token"] = hash.tokenVO.token
      }

      fetch_by_data_type(url, method, data, data_type).then(request_then(promise))
    })

    return promise
  }
}

const fetch_by_data_type = (url, method, data, data_type) => {
  if(data_type == "query"){
    url = url + hash_2_query(data)
    return fetch(url, {method: method})
  }

  if(data_type == "form_data"){
    return fetch(url, {
      method: method,
      body: hash_2_form_data(data)
    })
  }

  if(data_type == "urlencoded"){
    return fetch(url, {
      method: method,
      body: hash_2_urlencoded(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
}

const hash_2_form_data = (hash) => {
  if(Object.keys(hash).length == 0){
    return null
  }

  let form_data = new FormData()
  for (let key in hash) {
    let value = hash[key]
    form_data.append(key, value)
  }
  return form_data
}

const hash_2_query = (hash) => {
  if(Object.keys(hash).length == 0){
    return ""
  }

  let query_arr = []
  for(let property in hash){
    let key   = encodeURIComponent(property)
    let value = encodeURIComponent(hash[property])
    query_arr.push(`${key}=${value}`)
  }

  let query = `?${query_arr.join("&")}`

  return query
}

const hash_2_urlencoded = (hash) => {
  if(Object.keys(hash).length == 0){
    return ""
  }

  let formBody = []
  for (let property in data) {
    let key   = encodeURIComponent(property)
    let value = encodeURIComponent(data[property])
    formBody.push(`${key}=${value}`)
  }
  return formBody.join("&")
}

const request_then = (promise) => {
  return (res) => {

    if (is_json(res)) {
      res.json().then(
        res.ok ? (json)=>{promise.done_func(json, res)} : (json)=>{promise.fail_func(json, res)}
      )
    } else {
      console.log('返回的不是 JSON 信息')
    }

    promise.always_func(res)

  }
}

const is_json = function(res) {
  let content_type = res.headers.get('content-type')
  return content_type && content_type.indexOf('application/json') > -1
}

class FetchPromise {
  constructor (props) {
    this.done_func_callbacks   = []
    this.fail_func_callbacks   = []
    this.always_func_callbacks = []

    this.done_func    = function(){
      let args = arguments
      Array.from(this.done_func_callbacks).forEach((fun)=>{
        fun(...args)
      })
    }

    this.fail_func    = function(){
      let args = arguments
      Array.from(this.fail_func_callbacks).forEach((fun)=>{
        fun(...args)
      })
    }
    this.always_func  = function(){
      let args = arguments
      Array.from(this.always_func_callbacks).forEach((fun)=>{
        fun(...args)
      })
    }
  }

  done (func) {
    this.done_func_callbacks.push(func)
    return this
  }

  fail (func) {
    this.fail_func_callbacks.push(func)
    return this
  }

  always (func) {
    this.always_func_callbacks.push(func)
    return this
  }
}
