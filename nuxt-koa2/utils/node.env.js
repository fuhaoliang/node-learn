let baseURL = ''
console.info('process.env.NODE_ENV===>', process.env.PATH_TYPE)
if (process.env.PATH_TYPE === 'test') {
  baseURL = 'http://127.0.0.1:8080/test'
} else {
  baseURL = 'http://127.0.0.1:8080/production'
}

export { baseURL }
