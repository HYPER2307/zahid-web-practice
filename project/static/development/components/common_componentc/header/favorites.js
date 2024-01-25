import { delete_item } from "../../module/shop_scripts/basket_action";
import {
  getFavorites,
  addToFavorites,
  removeFavoriteItem,
} from "../../../api/favorites";

export const updateFavoriteLabel = async () => {
  const favorites = await getFavorites();
  const favoritesLength = favorites?.length;

  const headerFavoritesTotalCount = document.querySelector(
    ".header__favorites-quantity"
  );

  if (favoritesLength) {
    headerFavoritesTotalCount.textContent = favoritesLength;
  } else {
    headerFavoritesTotalCount.textContent = "";
  }
};

document.addEventListener("click", async ({ target }) => {
  const productItem = target.closest(".product");
  const productId = productItem?.dataset.productId;
  const favoriteId = productItem?.dataset.favoriteId;

  const productFavoriteBtn = target.closest(".product__favorite-btn");

  if (productFavoriteBtn) {
    const activeItem = productFavoriteBtn.querySelector("img");

    if (activeItem.src.includes("red-heart")) {
      await removeFavoriteItem(productId);
      activeItem.src = "/static/source/img/heart.png";
      updateFavoriteLabel();

      if (favoriteId) {
        delete_item(target, ".product");
      }
    } else {
      await addToFavorites(productId);
      activeItem.src = "/static/source/img/red-heart.png";
      updateFavoriteLabel();
    }
  }
});
