import { getProductsBySearch } from "../../../api/products";

const searchInput = document.querySelector(".search__input input");
const searchModal = document.querySelector(".search-modal");
const searchModalItems = searchModal.querySelector(".search-modal__items");

const renderSearchItem = ({
  id,
  image,
  title,
  discount,
  second_price,
  url,
}) => {
  return `
        <a href="${url}">
          <div class="product-column" data-product-id="${id}">
            <div class="product-column__left">
              <div class="product-column__img">
                <img
                  src="${image}" alt="${title}"
                />
              </div>
              <h4 class="product-column__title">
                ${title}
              </h4>
            </div>
            <div class="product-column__center">
              <p class="product-column__price"><span>${
                discount || second_price
              }</span>грн</p>
            </div>
          </div>
        </a>`;
};

const renderSearchProducts = (searchItems) => {
  const renderedSearchItems = searchItems?.map((item) =>
    renderSearchItem(item)
  );

  if (renderedSearchItems?.length) {
    searchModalItems.innerHTML = renderedSearchItems.join("");
  } else {
    searchModalItems.innerHTML =
      "<p class='search-modal__text'>Товарів не знайдено</p>";
  }
};

const searchFunc = async () => {
  if (searchInput.value) {
    const searchItems = await getProductsBySearch(searchInput.value);
    renderSearchProducts(searchItems);
    searchInput.value = "";
  }
};

searchInput.addEventListener("input", () => {
  searchModal.classList.add("active");
});

searchInput.addEventListener("keypress", ({ key }) => {
  if (key === "Enter") {
    searchFunc();
  }
});

document.addEventListener("click", ({ target }) => {
  if (target.closest(".search__btn")) {
    searchFunc();
  }
  if (target.closest(".search__input input")) {
    searchModal.classList.toggle("active");
  }
  if (!target.closest(".header")) {
    searchModal.classList.remove("active");
  }
});
