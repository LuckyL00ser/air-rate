<template>
    <div>
      <v-app-bar app id="bar" >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
        <v-spacer class="hidden-md-and-up"></v-spacer>
        <router-link  to="/" class="mx-auto" id="bar-container">
          <img src="../assets/logo.png" alt="logo"/>
          <v-toolbar-title class="headline">
            <span >Air</span>
            <span class="font-weight-light ">Rate</span>
          </v-toolbar-title>
        </router-link>
        <span id="list" class="mx-10 d-none d-md-inline" >
        <router-link tag="a" to="/products">Produkty</router-link>
        <router-link tag="a" to="/about">O nas</router-link>
        <router-link tag="a" to="/rules">Regulamin</router-link>
      </span >
        <v-spacer></v-spacer>

        <div class="d-none d-md-inline">
        <span v-if="status.loggedIn">
        <v-btn outlined color="primary" class="mr-2"  to="/user-dashboard">
          Panel użytkownika
        <v-icon class="ml-1">
          fas fa-user-circle
        </v-icon>
      </v-btn>

        <v-btn outlined color="accent" @click="$store.dispatch('user/logout')" >
          Wyloguj
        <v-icon class="ml-1">
        fas fa-sign-out-alt
        </v-icon>
      </v-btn>
      </span>
          <span v-else>
        <v-btn outlined color="primary" class="mx-2" to="/register">
          Rejestracja
          <v-icon class="ml-1">
            far fa-edit
          </v-icon>
      </v-btn>
        <v-btn outlined color="secondary" to="/login">
          Logowanie
          <v-icon class="ml-1">
            fas fa-sign-in-alt
          </v-icon>
      </v-btn>
      </span>
        </div>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" app  temporary class="pa-3">
          <template v-slot:prepend>
            <div class="drawer-prepend text-left">
              <img src="../assets/logo.png" alt="logo" class="navigation-image"/>
              <span v-if="status.loggedIn" class="vertical-align">{{userData.username}}</span>
              <span v-else>AirRate</span>
            </div>
            <v-divider></v-divider>
          </template>
        <v-list class="text-left" >
          <v-list-item-group color="primary">
            <v-list-item v-for="element in nav" :key="element.name" @click="$router.push({path: element.to})" >
              <v-list-item-icon>
                <v-icon class="mr-2">
                  {{element.icon}}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                {{element.name}}
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="status.loggedIn" @click="$router.push({path: 'user-dashboard'})">
              <v-list-item-icon>
                <v-icon class="mr-2">
                  fas fa-user-circle
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Panel użytkownika
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>


        </v-list>


        <template v-slot:append >
          <v-btn v-if="status.loggedIn" class="col-12 accent" @click="$store.dispatch('user/logout')">
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
        </template>
      </v-navigation-drawer>
    </div>


</template>

<script>

import {mapState} from 'vuex';
export default {
  name: 'Navbar',
  data() {
    return {
      drawer: false,
      nav: [
        {
          name: 'Mapa zanieczyszczeń',
          icon: 'fas fa-map-marked-alt',
          to: '/'
        },
        {
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
        },

      ]

    };
  },
  computed: {
    ...mapState('user',['status','userData'])
  }
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

</style>
