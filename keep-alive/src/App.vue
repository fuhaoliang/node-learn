<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/about/123" >Params</router-link> |
      <router-link :to="{ path:'/query', query: { num: 1}}" >Query</router-link> |
      <router-link to="/A">A</router-link> |
      <router-link to="/B">B</router-link> |
      <router-link to="/C">C</router-link> |
    </div>
    <router-view/>
    <h1>-------keepAlive------</h1>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <h1>-------incloude------</h1>
    <keep-alive include="params">
      <router-view/>
    </keep-alive>
    <h1>-------excloude------</h1>
    <keep-alive exclude="params">
      <router-view/>
    </keep-alive>
    <h1>--------router.meta------</h1>
    <keep-alive>
      <router-view v-show="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-show="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
    </router-view>
    <h1>--------使用 router.meta 拓展----------</h1>
    <keep-alive>
      <router-view v-show="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-show="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
    </router-view>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
