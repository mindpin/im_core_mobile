/*
 * @providesModule IcmRouteMap
 */

import IcmPage from 'IcmPage'

let map = {}
for (let page in IcmPage) {
  map[page] = {component: IcmPage[page]}
}

export default map
 