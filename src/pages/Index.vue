<template>
  <q-page class="flex flex-center">
    <div>Quantidade de carros {{ quantidadeCarros }}</div>
  </q-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'PageIndex',
  computed: {
    ...mapState('carros', ['counter', 'list']),
    ...mapGetters('carros', ['quantidadeCarros', 'contador'])
  },
}
</script>
