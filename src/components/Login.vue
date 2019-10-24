<template>
          <subpage-card :class="{ 'text-left': !status.loggedIn}">
              <template v-slot:prepend>
                  <span v-if="!status.loggedIn" >Logowanie</span>
                  <span v-else>Jesteś już zalogowany
                  <v-divider ></v-divider></span>
              </template>
              <template v-slot:card-text>
                  <div v-if="!status.loggedIn">
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
                  </div>

              </template>
              <template v-slot:action-button>
                      <v-btn v-if="!status.loggedIn" @click="validate"
                             class="d-md-none d-block primary"
                             :loading="!!status.processingLogin"
                             :disabled="!!status.processingLogin">Zaloguj się</v-btn>
              </template>
                <template v-slot:append>
                    <small v-if="!status.loggedIn">
                        Nie masz jeszcze konta? <router-link to="/register">Zarejestruj się</router-link>
                    </small>
                    <v-btn class="secondary mb-4" v-else to="/">
                        Wróć na stronę główną
                    </v-btn>
                </template>
          </subpage-card>


</template>

<script>
import { mapState } from 'vuex';
import SubpageCard from './SubpageCard';

export default {
	name: 'Login',
	components: { SubpageCard },
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
					console.log(error);
				}
			}
		},

	},
};
</script>

<style scoped>

</style>
