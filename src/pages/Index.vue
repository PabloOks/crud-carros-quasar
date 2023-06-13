<template>
  <q-page class="q-pa-md" padding>
    <q-dialog v-model="showEditForm" @hide="resetForm()">
      <q-card style="width: 80%;">
        <q-card-section>
          <div class="text-h6">Novo veículo</div>
        </q-card-section>
        <q-card-section class="items-center">
          <q-input v-model="form.brand.value" type="text" label="Fabricante" :error="form.brand.error ? true : false"
            :error-message="form.brand.error" @input="form.brand.error = ''" />
          <q-input v-model="form.model.value" type="text" label="Modelo" :error="form.model.error ? true : false"
            :error-message="form.model.error" @input="form.model.error = ''" />
          <q-input v-model="form.color.value" type="text" label="Cor" :error="form.color.error ? true : false"
            :error-message="form.color.error" @input="form.color.error = ''" />
          <q-input v-model="form.year.value" type="text" label="Ano de fabricação" :error="form.year.error ? true : false"
            :error-message="form.year.error" @input="form.year.error = ''" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Salvar" color="primary" @click="editarCarro" />
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showDeleteForm" @hide="resetForm()">
      <q-card style="width: 80%;">
        <q-card-section>
          <div class="text-h6">Excluir veículo</div>
        </q-card-section>
        <q-card-section>
          Deseja excluir o veículo <span>ID {{ form.id }}: {{ form.brand.value }} {{ form.model.value }}?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Sim" color="red" @click="excluirCarro" />
          <q-btn flat label="Não" color="secondary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="row justify-center">
      <h4>Lista de veículos</h4>
    </div>

    <div class="row" style="margin-bottom: 1rem;">
      <q-btn color="primary" icon="add" label="Novo" to="/novo" />
    </div>

    <q-table title="Lista de Veículos" :data="list" :columns="columns" row-key="id" :pagination-label="paginationLabel"
      no-results-label="Nenhum registro encontrado" rows-per-page-label="Registros por página" selection="single"
      :selected.sync="selected" :selected-rows-label="selectLabel" :loading="loading" @selection="handleSelection">
      <template v-slot:top>
        <q-btn color="primary" icon="edit" label="Editar" @click="if (selected.length != 0) showEditForm = true"
          style="margin-right: 1rem;" />
        <q-btn color="red" icon="delete" label="Excluir" @click="if (selected.length != 0) showDeleteForm = true" />
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'PageIndex',
  computed: {
    ...mapState('carros', ['list']),
    ...mapActions('carros', ['fetchCarros', 'updateCarro', 'deleteCarro'])
  },
  components: {

  },
  mounted() {
    this.$store.dispatch('carros/fetchCarros')
  },
  methods: {
    paginationLabel(firstRowIndex, endRowIndex, totalRowsNumber) {
      return `${firstRowIndex}-${endRowIndex} de ${totalRowsNumber}`
    },
    selectLabel(rows) {
      return (rows > 1)
        ? `${rows} linhas foram selecionadas`
        : `${rows} linha foi selecionada`
    },
    reloadTable() {
      this.$store.dispatch('carros/fetchCarros')
    },
    resetSelected() {
      this.selected = []
    },
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
    handleSelection(details) {
      this.resetForm()
      if (details.added) {
        this.form.id = details.rows[0].id
        this.form.brand.value = details.rows[0].brand
        this.form.model.value = details.rows[0].model
        this.form.color.value = details.rows[0].color
        this.form.year.value = details.rows[0].year
      }
    },
    async editarCarro() {
      const result = await this.$store.dispatch(
        'carros/updateCarro',
        {
          id: this.form.id,
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
        this.showEditForm = false
        this.resetForm()
        this.reloadTable()
        this.resetSelected()
      }
    },
    async excluirCarro() {
      const result = await this.$store.dispatch(
        'carros/deleteCarro',
        { id: this.form.id }
      )

      this.showDeleteForm = false
      this.resetForm()
      this.reloadTable()
      this.resetSelected()
    }
  },
  data() {
    return {
      columns: [
        {
          name: 'id',
          label: 'ID',
          field: 'id',
          sortable: true,
        },
        {
          name: 'brand',
          label: 'Fabricante',
          field: 'brand',
          sortable: true
        },
        {
          name: 'model',
          label: 'Modelo',
          field: 'model',
          sortable: true
        },
        {
          name: 'color',
          label: 'Cor',
          field: 'color',
          sortable: true
        },
        {
          name: 'year',
          label: 'Ano de fabricação',
          field: 'year',
          sortable: true
        },
      ],
      selected: [],
      loading: false,
      showEditForm: false,
      showDeleteForm: false,
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

<style>
h4 {
  margin: 0;
}
</style>