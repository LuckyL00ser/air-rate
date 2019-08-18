<template>

    <v-app-bar app id="bar">
        <router-link  to="/" class="mx-auto" id="bar-container">
          <img src="../assets/logo.png" alt="logo"/>
          <v-toolbar-title class="headline">
            <span >Air</span>
            <span class="font-weight-light ">Rate</span>
          </v-toolbar-title>
        </router-link>
      <span id="list" class="mx-10" >
        <router-link tag="a" to="/products">Produkty</router-link>
        <router-link tag="a" to="/about">O nas</router-link>
        <router-link tag="a" to="/rules">Regulamin</router-link>
      </span >
      <v-spacer></v-spacer>


      <span v-if="status.loggedIn">
        <router-link class="mr-2"  to="/user-dashboard">
        <v-icon>
          fas fa-user-circle
        </v-icon>
      </router-link>

        <a @click="$store.dispatch('user/logout')" >
        <v-icon>
        fas fa-sign-out-alt
        </v-icon>
      </a>
      </span>
      <span v-else>
        <router-link to="/register">
          Rejestracja
      </router-link> |
        <router-link to="/login">
          Logowanie
      </router-link>
      </span>

    </v-app-bar >

</template>

<script>
/*
TODO:: menu zwykle
<v-toolbar-side-icon @click="drawer=true" class="hidden-lg-and-up"></v-toolbar-side-icon> TODO:: hamburger
...
<v-spacer class="hidden-md-and-down"></v-spacer>
<v-toolbar-items class="hidden-md-and-down">
  <v-btn flat>
    <router-link to="/">
      Mapa zanieczyszczeń
    </router-link>
  </v-btn>
  <v-btn flat>
    <router-link to="/about">
      Nasza misja
    </router-link>
  </v-btn>
</v-toolbar-items>

TODO:: menu mobilne - wsadzic po </toolbar>
<v-navigation-drawer
  v-model="drawer"
  absolute
  temporary
>
  <v-list class="pa-1">
    <v-list-tile avatar>
      <v-list-tile-avatar>
        <img src="../assets/AirRate_ico.png">
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title>AirRate</v-list-tile-title>
      </v-list-tile-content>

    </v-list-tile>
  </v-list>

  <v-list class="pt-0" >
    <v-divider></v-divider>

    <v-list-tile to="/">
      <v-list-tile-action>
        <v-icon>
          fas fa-map
        </v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Mapa zanieczyszczeń</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile to="/about">
      <v-list-tile-action>
        <v-icon>
          fas fa-map
        </v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title to="/about">Nasza misja</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</v-navigation-drawer>

*/
import {mapState} from 'vuex';
export default {
  name: 'Navbar',
  data() {
    return {
      drawer: false,
      collapseOnScroll: true,

    };
  },
  computed: {
    ...mapState('user',['status','user'])
  }
};
</script>

<style scoped>

  #list{
    list-style-type: none;

  }
  #list>*{
    display: inline;
    margin: 0 1rem;
  }

  #bar-container, img{
    height: 100%;
  }
  #bar-container >*{
    display: inline-block;
    vertical-align: middle;
  }

</style>
