import results from "./axios";

export async function addData(first, data) {
  let data1 = await results
    .put("/" + first + ".json", data)
    .then((res) => results.get("/.json"))
    .catch((e) => console.log(e));

  return data1;
}

export async function deleteData(data) {
  let data1 = await results
    .delete(data)
    .then((res) => results.get("/.json"))
    .catch((e) => console.log(e));
  return data1;
}

export async function updateData(data, path) {
  let data1 = await results
    .patch(path+".json",data)
    .then((res) => results.get("/.json"))
    .catch((e) => console.log(e));
  return data1;
}