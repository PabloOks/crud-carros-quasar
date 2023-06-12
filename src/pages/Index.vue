<template>
  <q-page class="flex column items-center" padding>
    <div>Quantidade de carros: {{ quantidadeCarros }}</div>
    <p>Lista de carros:</p>
    <ul>
      <li v-for="carro in list" :key="carro.id">{{ carro.id }}: {{ carro.brand }} {{ carro.model }}</li>
    </ul>
  </q-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'PageIndex',
  computed: {
    ...mapState('carros', ['list']),
    ...mapGetters('carros', ['quantidadeCarros'])
  },
  mounted() {
    this.$store.dispatch('carros/fetchCarros')
  },
}
</script>
