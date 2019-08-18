<template>
  <v-app id="app">
    <Navbar app/>
    <v-content >

          <router-view />

    </v-content>
    <Footer app/>
    <v-snackbar v-model="show" :color="type"  bottom multi-line >
        {{message}}
      <v-btn
        icon
        @click="$store.dispatch('alert/removeAlert')"
      >
        <v-icon>
          fas fa-times
        </v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>
<script>
  import Navbar from './components/Navbar.vue';
  import Footer from './components/Footer.vue';
  import {mapState} from 'vuex';
  export default {
    name: 'App',
    components: {Navbar,Footer},
    computed:{
      ...mapState('alert',{
        show: state=>state.show,
        message: state=>state.message,
        type: state=>state.type,
      })
    },


  }
</script>

<style>

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a{
  text-decoration: none;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
.center-absolute{
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
}
.h-100{
    height:100%;
  }


</style>
