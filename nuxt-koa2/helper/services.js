import {gcontant} from '../config/app'

const release = {
  host: gcontant.release,
  getReleaseInfo: {
    method: 'get',
    url: '/newdeploynotice/deploynotice.json'
  }
}

const fpmw = {
  host: gcontant.fpmw,
  getUser: {
    method: 'get',
    url: '/api/rest/v1.0/user'
  },
  login: {
    method: 'post',
    url: '/api/rest/v1.0/login'
  },
  logout: {
    method: 'post',
    url: '/api/rest/v1.0/tenant/fp/logout'
  },
  sendEmail: {
    method: 'post',
    url: '/api/rest/v1.0/email'
  }
}

const appRouter = {
  host: 'http://localhost:8081',
  index: {
    method: 'get',
    url: '/index'
  }
}

export default {
  appRouter,
  release,
  fpmw
}
