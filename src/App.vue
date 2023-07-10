<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  padding: 0;
  margin: 0;
}

@media screen and (min-width: 1920px) {
  html {
    font-size: 18px;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1920px) {
  html {
    font-size: 16px;
  }
}

@media screen and (min-width: 800px) and (max-width: 1024px) {
  html {
    font-size: 14px;
  }
}

@media screen and (max-width: 800px) {
  html {
    font-size: 12px;
  }
}

@media screen and (min-width: 100px) and (max-width: 768px) {
  html {
    font-size: 10px;
  }
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
