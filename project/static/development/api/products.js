import { instance } from "./instance";

export async function getProductsBySearch(searchValue) {
  try {
    const { data } = await instance.get(
      `/api/search_items/?search_query=${searchValue}`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
}
