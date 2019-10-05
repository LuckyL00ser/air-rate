<template>
  <v-app id="app" dark>
    <Navbar app @showLoginOverlay="showOverlay=true"/>
    <v-dialog
      v-model="showOverlay"
      content-class="justify-center auto-width col-12 col-sm-6 col-md-5 col-lg-4 pa-0"
      z-index="2000"
     >
      <login
        class="col-sm-12 col-md-12"
        @logged="showOverlay=false"/>
    </v-dialog>
    <v-content >
          <router-view />
    </v-content>
    <Footer />
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
  import Login from './components/Login.vue';
  import {mapState} from 'vuex';
  export default {
    name: 'App',
    components: {Navbar,Footer, Login},
    data() {
      return {
        showOverlay: false,
      }
    },
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

.center-absolute{
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
}
.h-100{
    height:100%;
  }
.panel{
  height:100vh;
}
  .auto-width{
    width: auto !important;
  }


</style>
