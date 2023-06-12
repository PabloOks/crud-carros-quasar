<template>
  <q-page class="q-pa-md" padding>
    <q-dialog v-model="showCreateForm" @hide="resetForm()">
      <q-card style="width: 300px;">
        <q-card-section>
          <div class="text-h6">Novo veículo</div>
        </q-card-section>
        <q-card-section class="items-center">
            <q-input v-model="form.brand.value" type="text" label="Fabricante" :error-message="form.brand.error" />
            <q-input v-model="form.model.value" type="text" label="Modelo" :error-message="form.model.error" />
            <q-input v-model="form.color.value" type="text" label="Cor" :error-message="form.color.error" />
            <q-input v-model="form.year.value" type="text" label="Ano de fabricação" :error-message="form.year.error" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Salvar" color="primary" />
          <q-btn flat label="Fechar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-table title="Lista de Veículos" :data="list" :columns="columns" row-key="id" :pagination-label="paginationLabel"
      no-results-label="Nenhum registro encontrado" rows-per-page-label="Registros por página" selection="single"
      :selected.sync="selected" :selected-rows-label="selectLabel" :loading="loading">
      <template v-slot:top>
        <q-btn color="primary" icon="add" label="Novo" @click="showCreateForm = true" />
        <q-btn color="primary" icon="add" label="Editar" @click="showEditForm = true" />
        <q-btn color="red" icon="add" label="Excluir" @click="showDeleteForm = true" />
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
    ...mapGetters('carros', ['quantidadeCarros']),
    ...mapActions('carros', ['fetchCarros'])
  },
  components: {

  },
  mounted() {
    this.$store.dispatch('carros/fetchCarros')
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
      paginationLabel(firstRowIndex, endRowIndex, totalRowsNumber) {
        return `${firstRowIndex}-${endRowIndex} de ${totalRowsNumber}`
      },
      selected: [],
      selectLabel(rows) {
        return (rows > 1)
          ? `${rows} linhas foram selecionadas`
          : `${rows} linha foi selecionada`
      },
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
    }
  }
}
</script>
