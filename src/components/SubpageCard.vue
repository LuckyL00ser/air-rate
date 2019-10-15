<template>
    <v-card light class="col-12 col-xl-3 col-md-5 col-sm-8 mx-auto my-auto">
        <h1 class="pa-4 ">
            <slot name="prepend">
            </slot>
        </h1>
        <v-card-text class="py-0">
            <slot name="card-text">
            </slot>

        </v-card-text>
        <v-card-actions class="py-0">
            <slot name="action-button">
            </slot>
        </v-card-actions>
        <div class="pa-4">
            <slot name="append"></slot>
        </div>
    </v-card>
</template>

<script>
    export default {
        name: "SubpageCard"
    }
</script>

<style scoped>

</style>
