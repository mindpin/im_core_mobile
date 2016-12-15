import build_url from 'im_core_mobile/app/api/build_url'
import APIFetch from 'APIFetch'

/* 验证登录用户 */
const sign_in = (data) => {
  let url = build_url('/admin/users/do_sign_in')
  return APIFetch.post(url, data)
}

/* 修改用户信息 */
const update_user = (data) => {
  let url = build_url('/admin/users/update_user')
  return APIFetch.post(url, data)
}

/* 获取用户信息 */
const get_user_detail = (data) => {
  let url = build_url('/admin/users/get_user_detail')
  return APIFetch.get(url, data)
}

/* 用户登出 */
const sign_out = (data) => {
  let url = build_url('/admin/users/do_sign_out')
  return APIFetch.post(url, data)
}

/* 获取资料信息 */
const get_ref_detail = (data) => {
  let url = build_url('/admin/references/get_ref_detail')
  return APIFetch.get(url, data)
}

/* 获取问答信息 */
const get_faq_detail = (data) => {
  let url = build_url('/admin/faqs/get_faq_detail')
  return APIFetch.get(url, data)
}

/* 获取参考资料文件 */
const get_ref_files = (data) => {
  let url = build_url('/admin/references/fetch_ref_file')
  return APIFetch.get(url, data)
}


export default {
  sign_in,
  sign_out,
  update_user,
  get_user_detail,
  get_ref_detail,
  get_faq_detail,
  get_ref_files,
}


    // API.register.reg(reg_params).done((res_data_json, res)=>{
    //   this.get_loading().dismiss()
    //   if(res_data_json.retCode == 1){
    //     this.props.navigator.push({id: "SignUpStep4", params: {}})
    //   }else{
    //     Alert.alert('错误提示', res_data_json.retMsg, [{ text: '确定'}])
    //   }
    // })

