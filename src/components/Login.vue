<template>
          <v-card light class="col-12 col-xl-3 col-md-5 col-sm-8 mx-auto my-auto">
            <v-card-text class="text-left" v-if="!status.loggedIn">
              <h1 class="greeting mt-2 mb-4 ">Logowanie</h1>
              <div class="d-flex">
                <v-form ref="form" v-model="valid"  class="flex-grow-1 d-flex align-center" @submit.prevent="validate">
                  <div class="flex-grow-1">
                    <v-text-field
                      v-model="username"
                      label="Nazwa użytkownika"
                      :rules="rules"></v-text-field>
                    <v-text-field
                      v-model="password"
                      label="Hasło"
                      :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                      @click:append="showPassword = !showPassword"
                      :type="showPassword ? 'text' : 'password'"
                      :rules="rules">
                    </v-text-field>
                  </div>
                  <v-btn  type="submit" class="flex-shrink-1 d-none d-md-flex ml-3"
                          fab x-large color="success" typeof="submit"
                          :loading="!!status.processingLogin"
                          :disabled="!!status.processingLogin">
                    <v-icon>
                      fas fa-chevron-right
                    </v-icon>
                  </v-btn>
                </v-form>
              </div>
              <v-card-actions class="d-block px-0">
                <v-btn @click="validate"
                       class="d-md-none d-block primary"
                       :loading="!!status.processingLogin"
                       :disabled="!!status.processingLogin">Zaloguj się</v-btn>
                <small class="d-block mt-2">Nie masz jeszcze konta? <router-link to="/register">Zarejestruj się</router-link></small>
              </v-card-actions>
            </v-card-text>
              <v-card-text v-else>
                  <h1 class="my-3">Jesteś już zalogowany</h1>
                  <router-link  to="/">Wróć na stronę główną</router-link>
              </v-card-text>
          </v-card>


</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      valid: false,
      rules: [
        value => !!value || 'Pole wymagane',
      ],

    };
  },
  computed: {
    ...mapState('user', ['status']),
  },
  methods: {
    async validate() {

      if (this.$refs.form.validate()) {
        try {
          const response = await this.$store.dispatch('user/login', { username: this.username, password: this.password });
           this.$emit('logged');
           this.$router.push('/');
        } catch (error) {
            console.log(error)
        }
      }
    },

  },
};
</script>

<style scoped>

</style>
