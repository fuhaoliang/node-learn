<template>
  <h1>About</h1>
</template>
<script>
  export default {
    name: 'home',
    mounted () {
      Promise.race([
        new Promise(function(resolve, reject) {
          setTimeout(() => resolve(1), 1000)
        }),
        new Promise(function(resolve, reject) {
          setTimeout(() => resolve(2), 100)
        }),
        new Promise(function(resolve, reject) {
          setTimeout(() => resolve(3), 10)
        })
      ]).then(value => {
        console.log(value) // 3
      })
    }
  }
</script>