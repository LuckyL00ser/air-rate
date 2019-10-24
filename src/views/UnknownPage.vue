<template>
    <v-container fill-height >
        <v-layout fill-height>
            <v-flex align-self-center>
                <subpage-card>
                    <template v-slot:prepend>
                        Błąd 404
                  <v-divider ></v-divider></span>
                    </template>
                    <template v-slot:card-text>
                        <div class="mb-4">
                            Podana strona nie istnieje
                        </div>
                    </template>
                    <template v-slot:append>

                        <v-btn class="secondary mb-4" to="/">
                            Wróć na stronę główną
                        </v-btn>
                    </template>
                </subpage-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import SubpageCard from '../components/SubpageCard.vue';

export default {
	name: 'UnknownPage',
	components: { SubpageCard },
};
</script>

<style scoped>

</style>
