<template>
  <q-page class="q-pa-md" padding>
    <div class="row justify-center">
      <h4>Cadastrar novo veículo</h4>
    </div>
    <div class="row" style="margin-bottom: 1rem;">
      <q-btn color="primary" icon="arrow_back" label="Voltar" to="/">
      </q-btn>
    </div>
    <div class="row justify-center">
      <q-card style="width: 80%;">
        <q-card-section>
          <div class="text-h6">Novo veículo</div>
        </q-card-section>
        <q-card-section class="items-center">
          <q-input v-model="form.brand.value" type="text" label="Fabricante" :error="form.brand.error ? true : false" :error-message="form.brand.error" @input="form.brand.error = ''" />
          <q-input v-model="form.model.value" type="text" label="Modelo" :error="form.model.error ? true : false" :error-message="form.model.error" @input="form.model.error = ''" />
          <q-input v-model="form.color.value" type="text" label="Cor" :error="form.color.error ? true : false" :error-message="form.color.error" @input="form.color.error = ''" />
          <q-input v-model="form.year.value" type="text" label="Ano de fabricação" :error="form.year.error ? true : false" :error-message="form.year.error" @input="form.year.error = ''" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Salvar" color="primary" @click="addCarro" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Novo',
  computed: {
    ...mapActions('carros', ['createCarros'])
  },
  mounted() {
  },
  methods: {
    resetForm() {
      this.form.id = 0
      this.form.brand.value = ''
      this.form.brand.error = ''
      this.form.model.value = ''
      this.form.model.error = ''
      this.form.color.value = ''
      this.form.color.error = ''
      this.form.year.value = ''
      this.form.year.error = ''
    },
    async addCarro() {
      const result = await this.$store.dispatch(
        'carros/createCarro',
        {
          brand: this.form.brand.value,
          model: this.form.model.value,
          color: this.form.color.value,
          year: this.form.year.value
        }
      )

      if (result.errors) {
        if (result.errors.brand) this.form.brand.error = result.errors.brand[0]
        if (result.errors.model) this.form.model.error = result.errors.model[0]
        if (result.errors.color) this.form.color.error = result.errors.color[0]
        if (result.errors.year) this.form.year.error = result.errors.year[0]
      } else {
        this.$router.push('/')
      }
    }
  },
  data() {
    return {
      form: {
        id: 0,
        brand: {
          value: '',
          error: ''
        },
        model: {
          value: '',
          error: ''
        },
        color: {
          value: '',
          error: ''
        },
        year: {
          value: '',
          error: ''
        }
      },
    }
  }
}
</script>

<style scoped></style>