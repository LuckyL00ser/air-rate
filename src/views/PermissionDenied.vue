<template>
  <v-container fill-height>
    <v-card class="col-12 col-lg-6 mx-auto my-auto py-5">
      <v-card-text class="px-sm-3 px-lg-12">
        <h1 class="text--primary">
          Nie jesteś zalogowany
        </h1>
        <v-divider class="my-4"></v-divider>
        <div class="mb-4 text-left">
          Dostęp do tej strony mają tylko zalogowani użytkownicy.
          <br>
          Nie masz jeszcze konta? Załóż je!
        </div>
        <v-flex class="d-lg-flex justify-space-between">
          <v-btn class="secondary" to="/login">
            Logowanie
          </v-btn>
          <v-btn class="secondary" to="/register">
            Rejestracja
          </v-btn>
        </v-flex>


      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'PermissionDenied',
};
</script>

<style scoped>

</style>
