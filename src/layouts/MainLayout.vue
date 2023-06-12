<template>
  <q-layout view="lHh Lpr lFf">
    <Navbar />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Navbar from 'src/components/Navbar.vue';

export default {
  name: 'MainLayout',
  components: {
    Navbar    
  },
  data () {
    return {
    }
  }
}
</script>
