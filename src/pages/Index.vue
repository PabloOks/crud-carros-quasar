<template>
  <q-page class="q-pa-md" padding>
    <q-dialog v-model="showCreateForm" @hide="resetForm()">

    </q-dialog>

    <div class="row justify-center">
      <h4>Lista de veículos</h4>
    </div>

    <div class="row" style="margin-bottom: 1rem;">
      <q-btn color="primary" icon="add" label="Novo" to="/novo" />
    </div>

    <q-table title="Lista de Veículos" :data="list" :columns="columns" row-key="id" :pagination-label="paginationLabel"
      no-results-label="Nenhum registro encontrado" rows-per-page-label="Registros por página" selection="single"
      :selected.sync="selected" :selected-rows-label="selectLabel" :loading="loading">
      <template v-slot:top>
        <q-btn color="primary" icon="edit" label="Editar" @click="showEditForm = true" style="margin-right: 1rem;" />
        <q-btn color="red" icon="delete" label="Excluir" @click="showDeleteForm = true" />
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
    ...mapActions('carros', ['fetchCarros'])
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
          field: 'brand',
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
      showCreateForm: false,
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
