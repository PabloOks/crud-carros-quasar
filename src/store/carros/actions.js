import axios from "axios";

/*
export function someAction (context) {
}
*/
export async function fetchCarros ({ commit }) {
  const { data: result } = await axios.get('http://localhost:8000/api/cars').then( result => result.data )
  console.log(result)
}

export async function createCarro ({ commit }, { brand, model, color, year }) {

}

export async function updateCarro ({ commit }, id, { brand, model, color, year }) {

}

export async function deleteCarro ({ commit }, id) {
  
}