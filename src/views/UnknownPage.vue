<template>
  <v-container fill-height>
    <v-card class="col-12 col-lg-6 mx-auto my-auto py-5">
      <v-card-text class="px-sm-3 px-lg-12">
        <h1 class="text--primary">
          Błąd 404
        </h1>
        <v-divider class="my-4"></v-divider>
        <div class="mb-4 text-left">
               Podana strona nie istnieje<br>
          Wróc na stronę główną.
        </div>

          <v-btn  class="secondary" to="/" >
            Strona główna
          </v-btn>

      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'UnknownPage',
};
</script>

<style scoped>

</style>
