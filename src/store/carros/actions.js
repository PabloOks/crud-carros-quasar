import axios from "axios";

/*
export function someAction (context) {
}
*/
export async function fetchCarros ({ commit }) {
  const { data: result } = await axios.get('http://localhost:8000/api/cars').then( result => result.data )
  commit('setList', result[0])
}

export async function createCarro ({ commit }, { brand, model, color, year }) {
  const form = new FormData()
  form.set('brand', brand)
  form.set('model', model)
  form.set('color', color)
  form.set('year', year)

  const result = await axios.post('http://localhost:8000/api/cars', form)
    .then(result => result.data)
    .catch(response => response.response.data)

  return result
}

export async function updateCarro ({ commit }, id, { brand, model, color, year }) {

}

export async function deleteCarro ({ commit }, id) {

}