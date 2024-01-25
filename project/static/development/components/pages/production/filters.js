const productionFilters = document.querySelector(".production__filters");
const priceRange = document.querySelector(".production__filters-range-price");

// open and close filters
const openFiltersBtn = document.querySelector(".open-filters-btn");
openFiltersBtn.addEventListener("click", () =>
  productionFilters.classList.add("active")
);

const closeFiltersBtn = document.querySelector(".close-filters-btn");
closeFiltersBtn.addEventListener("click", () =>
  productionFilters.classList.remove("active")
);

productionFilters.addEventListener("click", ({ target }) => {
  // dropdown filters
  if (target.closest(".production__filters-title")) {
    const filtersItem = target.closest(".production__filters-item");

    filtersItem.classList.toggle("active");
  }

  // dropdown for checkboxes
  if (
    target.closest(".checkbox-dropdown__head") &&
    target.tagName !== "LABEL"
  ) {
    const checkboxDropdown = target.closest(".checkbox-dropdown");
    const isOpenCheckboxDropdown = checkboxDropdown.querySelector(
      ".checkbox-dropdown__head input"
    ).checked;

    checkboxDropdown.classList.toggle("active");

    if (!isOpenCheckboxDropdown) {
      checkboxDropdown.classList.remove("active");
    }
  }
});

update_filter();

document
  .querySelector(".production__filters-apply-btn")
  .addEventListener("click", filtration);
document
  .querySelector(".production__filters-reset-btn")
  .addEventListener("click", () => (window.location = "?"));

function update_filter() {
  let params = window.location.search
    .replace("?", "")
    .split("&")
    .reduce(function (p, e) {
      if (e.length) {
        var a = e.split("=");
        p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
        return p;
      }
    }, {});

  for (let key in params) {
    if (key !== "page") {
      const values = params[key].split(",");
      for (let value of values) {
        const input = document.querySelector(
          `[data-slug="${key}"] input[value="${value}"]`
        );

        if (input) {
          input.checked = true;
          input.closest(".production__filters-item").classList.add("active");
        }
        // else {
        //     priceRange.querySelector("[name='min']").value = values[0];
        //     priceRange.querySelector("[name='max']").value = values[1];
        // }
      }
    }
  }
}

function filtration() {
  const filters = document.querySelectorAll(".production__filters-item");
  const url_arr = [];
  let url;
  filters.forEach((filter) => {
    const isFilterPrice = filter.classList.contains(
      "production__filters-item-price"
    );
    const select_options = isFilterPrice
      ? priceRange.querySelectorAll("input")
      : filter.querySelectorAll("input:checked");

    if (select_options.length) {
      const select_options_value = [];
      select_options.forEach((option) =>
        select_options_value.push(option.value)
      );
      const param_str = `${[filter.dataset.slug]}=${[...select_options_value]}`;
      url_arr.push(param_str);
    }
  });

  url = url_arr.join("&");
  window.location = `?${url}`;
}

// price filter
// const priceBtn = document.querySelector(".production__filters-price-btn");

// const updatePriceFilter = () => {
//     const priceRangeMinValue = priceRange.querySelector("[name='min']").value;
//     const priceRangeMaxValue = priceRange.querySelector("[name='max']").value;

//     window.location = `${window.location}${
//     window.location.search.includes("?") ? "&" : "?"
//   }price=${priceRangeMinValue},${priceRangeMaxValue}`;
// };

// priceBtn.addEventListener("click", updatePriceFilter);

// document.addEventListener("keypress", ({
//     target,
//     key
// }) => {
//     if (target.closest(".production__filters-range-price") && key === "Enter") {
//         updatePriceFilter();
//     }
// });
