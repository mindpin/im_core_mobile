import build_url from 'im_core_mobile/app/api/build_url'
import APIFetch from 'APIFetch'


const reg = (data) => {
  let url = build_url('/register/reg')
  return APIFetch.post(url, data)
}


export default {
  reg,
}