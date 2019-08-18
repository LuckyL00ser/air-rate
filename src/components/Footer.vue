<template>
  <v-footer class="elevation-5 white pb-0 px-0 flex-column" app absolute id="footer">
    <div class="py-1">
      <img src="@/assets/logo.png" class="d-inline-block vertical-middle"/>
      <div :hidden="$vuetify.breakpoint.mdAndDown" class=" d-inline-block vertical-middle">
        Nasza misja to walka o czyste i przyjazne środowisko.

      </div>

    </div>
    <div class="col-12 col-lg-10 col-xl-7">
      <v-divider class="w-100 py-0"></v-divider>
    </div>
    <div class="d-flex col-12 col-lg-10 col-xl-7 justify-center flex-wrap">
      <div class="col-12 col-md-4 pa-0 pa-lg-3 d-flex justify-center">
        <div>
          <p class="font-weight-bold text--secondary">Kontakt</p>
          <p class="mx-2 text-left d-inline-block">

            AirRate S.A.<br>
            ul. Akademicka 69<br>
            35-114 Rzeszów<br>
          </p>
          <p class="mx-2 text-left d-inline-block">
            Wojciech Czekirda<br>
            <a href="tel: ">+48 000 000 000</a><br>
            <a href="mailto: ">airrate@email.com</a>
          </p>
        </div>

      </div>
      <div class="col-12 col-md-4 my-md-0 my-5">
        <p class="font-weight-bold text--secondary">Media</p>
        <v-btn class="mx-3 primary--text" icon href="https://www.facebook.com/AirRate/" target="_blank">
          <v-icon size="30px">fab fa-facebook</v-icon>
        </v-btn>
        <v-btn class="mx-3 primary--text" icon href="mailto:mail.airrate@gmail.com">
          <v-icon size="30px">fas fa-envelope </v-icon>
        </v-btn>
        <v-btn class="mx-3 primary--text" icon href="tel: 000 000 000">
          <v-icon size="30px">fas fa-phone </v-icon>
        </v-btn>
      </div>
      <div class="col-12 col-md-4">
        <p class="font-weight-bold text--secondary">Informacje</p>
        <ul class=" px-0">
          <li><a href="#">Polityka prywatności</a></li>
          <li><a href="#">Regulamin</a></li>
        </ul>

      </div>
    </div>

      <v-divider class="w-100"></v-divider>
    <div class="grey lighten-4 py-4 w-100">

      <small class="font-weight-bold text--secondary">
        &copy;{{currentYear}} — AirRate Team
      </small>
    </div>


  </v-footer>
</template>

<script >
  export default {
    name: 'Footer',
    data(){
      return {
        currentYear: (new Date()).getFullYear(),
      }
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
