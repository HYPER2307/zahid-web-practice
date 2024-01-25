import { instance } from "./instance";

export async function getFavorites() {
  try {
    const { data } = await instance.get("/api/favour_items/");

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function addToFavorites(id) {
  try {
    const { data } = await instance.post("/api/favour_items/", { item_id: id });

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function removeFavoriteItem(id) {
  try {
    const { data } = await instance.delete(
      `/api/favour_item/${id}/remove_by_like/`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
}
