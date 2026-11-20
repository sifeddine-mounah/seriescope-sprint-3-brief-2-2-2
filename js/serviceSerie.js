import api from "./api.js";

export async function getSeries(params = {}) {
  const response = await api.get("/series", {
    params:params
  });
  console.log(response.data);
  return response.data;
}

export async function createSerie(newSerie) {
  const response = await api.post("/series", newSerie);

  console.log(response.data);
  return response.data;
}

export async function deleteSerie(suppression) {
  const response = await api.delete("/series", suppression);

  console.log(response.data);
  return response.data;
}
