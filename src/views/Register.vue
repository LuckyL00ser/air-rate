<template>
  <v-container fill-height >
    <v-layout fill-height>
      <v-flex class="my-10">
      <v-card class="col-12 col-xl-3 col-md-5 col-sm-8 mx-auto my-auto">

          <v-card-text class="text-left" v-if="!status.loggedIn">
            <h1 class="greeting mt-2 mb-4 ">Nowe konto</h1>
            <div class="d-flex">
              <v-form ref="form" v-model="valid"  @submit="validate" class="flex-grow-1">
                <v-text-field
                  v-model="username"
                  label="Nazwa użytkownika"
                  :rules="[requiredRule,usernameRule]"></v-text-field>
                <v-text-field
                  v-model="email"
                  label="E-mail"
                  :rules="[requiredRule,emailRule]"></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Hasło"
                  :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                  @click:append="showPassword = !showPassword"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="[requiredRule]">
                </v-text-field>
                <v-text-field
                  v-model="passwordRepeated"
                  label="Powtórz hasło"
                  :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                  @click:append="showPassword = !showPassword"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="[requiredRule,passwordRule]">
                </v-text-field>
              </v-form>
                <v-btn type="submit" @click="validate" class="flex-shrink-1 d-none d-md-flex ml-3 my-auto" fab x-large color="success" typeof="submit"
                    :loading="!!status.processingRegistration"
                    :disabled="!!status.processingRegistration">
                  <v-icon>
                    fas fa-chevron-right
                  </v-icon></v-btn>
            </div>
            <v-card-actions class="d-block px-0">
              <v-btn @click="validate" type="submit" class="d-md-none d-block secondary"
                     :loading="!!status.processingRegistration"
                     :disabled="!!status.processingRegistration">
                Zarejestruj się</v-btn>

            </v-card-actions>
          </v-card-text>
          <v-card-text v-else>
              <h1 class="my-3">Jesteś już zalogowany</h1>
              <router-link  to="/">Wróć na stronę główną</router-link>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      passwordRepeated: '',
      showPassword: false,
      valid: false,
      requiredRule: value => !!value || 'Pole wymagane',
      usernameRule: value => value.length > 5 || 'Zbyt krótka nazwa użytkownika',
      passwordRule: value => (value == this.password && this.password == this.passwordRepeated) || 'Podane hasła różnią się',
      emailRule: value => /.+@.+\..+/.test(value) || 'Niepoprawny e-mail',
    };
  },
  computed: {
    ...mapState('user', ['status']),
  },
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        try{
          const response = await this.$store.dispatch('user/register', { username: this.username, email: this.email, password: this.password });
          this.$router.push('/');
        }
        catch(error){
          console.error(error); //TODO delete this
        }

      };
    },
  },
};
</script>

<style scoped>

</style>
