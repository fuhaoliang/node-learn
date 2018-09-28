import { gcontant } from '../config/app'

const userHandle = {
  host: gcontant.gateway,
  userRegister: {
    method: 'post',
    url: '/api/register'
  },
  userLogin: {
    method: 'post',
    url: '/api/login'
  },
  getUser: {
    method: 'get',
    url: '/api/users'
  },
  delUser: {
    method: 'post',
    url: '/api/delUser'
  }
}

export default {
  userHandle
}
