<template>
      <v-container fill-height >
            <v-layout fill-height>
              <v-flex align-self-center>
              <login />
              </v-flex>
            </v-layout>
      </v-container>
</template>

<script>
import Login from '../components/Login.vue';

export default {
  name: 'LoginView',
  components: { Login },
};
</script>

<style scoped>

</style>
