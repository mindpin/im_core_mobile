import build_url from 'im_core_mobile/app/api/build_url'
import APIFetch from 'APIFetch'


const reg = (data) => {
  let url = build_url('/register/reg')
  return APIFetch.post(url, data)
}


export default {
  reg,
}


    // API.register.reg(reg_params).done((res_data_json, res)=>{
    //   this.get_loading().dismiss()
    //   if(res_data_json.retCode == 1){
    //     this.props.navigator.push({id: "SignUpStep4", params: {}})
    //   }else{
    //     Alert.alert('错误提示', res_data_json.retMsg, [{ text: '确定'}])
    //   }
    // })

