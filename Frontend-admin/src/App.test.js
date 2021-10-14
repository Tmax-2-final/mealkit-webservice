import React from 'react'
import { shallow } from 'enzyme/build'
import App from './App'
import AdminUser from './views/admin/AdminUser.js'

it('mounts App without crashing', () => {
  const wrapper = shallow(<App />)
  wrapper.unmount()
})

it('mounts AdminUser without crashing', () => {
  const wrapper = shallow(<AdminUser />)
  wrapper.unmount()
})
