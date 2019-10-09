<template>
  <v-footer class="elevation-5  pb-0 px-0 flex-column "  app  absolute id="footer">
    <div class="d-none d-md-block py-0">
      <div class="py-1 mx-12">
        <img src="@/assets/logo.png" class="d-inline-block vertical-middle"/>
        <div class="d-inline-block vertical-middle">
          Nasza misja to walka o czyste i przyjazne środowisko.
        </div>
      </div>
        <v-divider class="w-100 py-1 "></v-divider>
    </div>
    <div class="d-flex col-12 col-md-8 col-lg-6 col-xl-7 justify-md-space-around justify-center flex-wrap text-md-left">
      <div class="col-12 col-md-auto text--secondary">
        <p class="font-weight-bold mx-4">Kontakt</p>
        <v-btn class="mx-2 " color="primary" icon href="https://www.facebook.com/AirRate/" target="_blank">
          <v-icon size="30px">fab fa-facebook</v-icon>
        </v-btn>
        <v-btn class="mx-2 " color="primary" icon href="mailto:mail.airrate@gmail.com">
          <v-icon size="30px">fas fa-envelope </v-icon>
        </v-btn>
        <v-btn class="mx-2" color="primary" icon href="tel: 000 000 000">
          <v-icon size="30px">fas fa-phone </v-icon>
        </v-btn>
      </div>
      <div class="col-12 col-md-auto">
        <p class="font-weight-bold text--secondary">Informacje</p>
        <ul class=" px-0">
          <li><a href="#">Polityka prywatności</a></li>
          <li><a href="#">Regulamin</a></li>
        </ul>
      </div>
    </div>

      <v-divider class="w-100"></v-divider>
    <div class="grey lighten-3 py-4 w-100 white">
      <small class="">
        &copy;{{currentYear}} — AirRate
      </small>
    </div>


  </v-footer>
</template>

<script >
export default {
  name: 'Footer',
  data() {
    return {
      currentYear: (new Date()).getFullYear(),
    };
  },
};
</script>

<style scoped>
  .vertical-middle{
    vertical-align: middle;
  }
  ul{
    list-style-type: none;
  }
  img{
    height:40px;
  }
  .w-100{
    width:100%;
  }
  .w-50{
    width:50%;
  }
  #footer{
    z-index: 5;

  }
</style>
