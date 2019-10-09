<template>
    <div>

      <v-app-bar absolute app id="bar" >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up" style="position: absolute"></v-app-bar-nav-icon>
        <v-spacer class="hidden-md-and-up"></v-spacer>
        <router-link  to="/" class="mx-auto" id="bar-container">
          <img src="../assets/logo.png" alt="logo"/>
          <v-toolbar-title class="headline ">
            <span >Air</span>
            <span class="font-weight-light ">Rate</span>
          </v-toolbar-title>
        </router-link>
<!--        <span id="list" class="mx-10 d-none d-md-inline" >-->
<!--        <router-link tag="a" to="/products">Produkty</router-link>-->
<!--        <router-link tag="a" to="/about">O nas</router-link>-->
<!--        <router-link tag="a" to="/rules">Regulamin</router-link>-->
<!--      </span >-->
        <v-spacer></v-spacer>

        <div class="d-none d-md-inline">
        <span v-if="status.loggedIn">
        <v-btn text color="primary"  to="/user-dashboard">
          {{userData.username}}
        <v-icon class="ml-1">
          fas fa-user-circle
        </v-icon>

        </v-btn>
       <v-btn text color="accent"  @click="logout" >
        <v-icon >
        fas fa-sign-out-alt
        </v-icon>
      </v-btn>


      </span>
          <span v-else>

        <router-link   to="/login">
          Zaloguj się
          <v-icon  class="primary--text">
            fas fa-sign-in-alt
          </v-icon>
      </router-link>
      </span>
        </div>
      </v-app-bar>
      <v-navigation-drawer  v-model="drawer" app >
          <template v-slot:prepend>
            <div class="drawer-prepend text-left pa-3 ">
              <img src="../assets/logo.png" alt="logo" class="navigation-image"/>
              <h3 v-if="status.loggedIn" class="vertical-align font-weight-light">{{userData.username}}</h3>
              <span v-else class="vertical-align font-weight-light">AirRate</span>
            </div>
            <v-divider></v-divider>
          </template>
        <v-list class="text-left" >
          <v-list-item-group color="primary">
            <v-list-item v-for="element in nav" :key="element.name" @click="$router.push({path: element.to})" >
                <v-icon class="mr-2">
                  {{element.icon}}
                </v-icon>
              <v-list-item-content>
                {{element.name}}
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="status.loggedIn" @click="$router.push({path: 'user-dashboard'})">
              <v-icon class="mr-2">
                  fas fa-user-circle
                </v-icon>
              <v-list-item-title>
                Panel użytkownika
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <template v-slot:append>
          <div  class="pa-3">
            <v-btn v-if="status.loggedIn" class="col-12 accent" @click="logout">
              Wyloguj się
            </v-btn>
            <div v-else>
              <v-btn class="primary col-12 my-2" to="/login">
                Zaloguj się
              </v-btn>
              <v-btn class="secondary col-12" to="/register">
                Rejestracja
              </v-btn>
            </div>
          </div>

        </template>
      </v-navigation-drawer>
    </div>


</template>

<script>

import { mapState } from 'vuex';
import Login from './Login';

export default {
  name: 'Navbar',
  data() {
    return {
      drawer: false,
      nav: [
        {
          name: 'Mapa zanieczyszczeń',
          icon: 'fas fa-map-marked-alt',
          to: '/',
        },
        /* {
          name: 'Produkty',
          icon: 'fas fa-shopping-cart',
          to: '/products'
        },
        {
          name: 'O nas',
          icon: 'fas fa-info-circle',
          to: '/about'
        },
        {
          name: 'Regulamin',
          icon: 'far fa-file-alt',
          to: '/rules'
        }, */

      ],

    };
  },
  computed: {
    ...mapState('user', ['status', 'userData']),
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout');
      this.$router.push('/');
    },
  },


};
</script>

<style scoped>
  .navigation-image{
    height: 50px;
  }
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
  #bar-container >*,.drawer-prepend>*{
    display: inline-block;
    vertical-align: middle;
  }
  #bar{
    z-index: 4;
  }


</style>
