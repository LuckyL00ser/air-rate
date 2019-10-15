<template>
    <v-container fill-height >
        <v-layout fill-height>
            <v-flex align-self-center>
                <subpage-card>
                    <template v-slot:prepend>
                        Nie jesteś zalogowany
                        <v-divider ></v-divider></span>
                    </template>
                    <template v-slot:card-text>
                        <div class="mb-4">
                            Dostęp do tej strony mają tylko zalogowani użytkownicy.
                            <br>
                            Nie masz jeszcze konta? Załóż je!
                        </div>
                    </template>
                    <template v-slot:append>
                        <v-flex class="d-lg-flex justify-space-between">
                            <v-btn class="secondary" to="/login">
                                Logowanie
                            </v-btn>
                            <v-btn class="secondary" to="/register">
                                Rejestracja
                            </v-btn>
                        </v-flex>
                    </template>
                </subpage-card>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
    import SubpageCard from '../components/SubpageCard.vue'
export default {
  name: 'PermissionDenied',
    components: {SubpageCard}
};
</script>

<style scoped>

</style>
