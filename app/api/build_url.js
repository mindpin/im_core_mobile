import SERVER_URL from 'im_core_mobile/app/constants/server_url'

const build_url = (path) => {
  return SERVER_URL + path
}

export default build_url
