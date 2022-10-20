<template>
  <div>
    <div>
      <NavBar />
    </div>

    <slot class="body" name="body"></slot>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue"


export default {
  name: 'App',
  components:{
    NavBar
  },
  data: () => ({
    //
  }),
};
</script>
<style>
/* .body{
  margin-top:80px;
} */

/* html,body,#app{
 height: 100vh;
} */

body {
  height: 100vh;
}
</style>
