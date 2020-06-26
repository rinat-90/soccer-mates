<template>
  <v-layout justify-center>
    <v-card width="600">
      <v-card-title>
        <div class="display-1 mx-auto">Register</div>
      </v-card-title>
      <v-card-text>
        <register-form />
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
  import RegisterForm from "../components/Forms/RegisterForm";
  export default {
    name: "Register",
    components: { RegisterForm },
  }
</script>

<style scoped>

</style>
