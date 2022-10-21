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


html{
 height: 100vh;
 background-color: #FFF7EE !important;
}


</style>
