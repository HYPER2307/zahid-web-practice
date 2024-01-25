// const updatePriceFilter = () => {
//   const priceRangeMinValue = priceRange.querySelector("[name='min']").value;
//   const priceRangeMaxValue = priceRange.querySelector("[name='max']").value;

//   window.location = `${window.location}${
//     window.location.search.includes("?") ? "&" : "?"
//   }price=${priceRangeMinValue},${priceRangeMaxValue}`;
// };

// priceBtn.addEventListener("click", updatePriceFilter);
// //
const SORT_QUERY_ACTION_NAME = "prioritet";
const sortItems = document.querySelector(".production__sort-items");
const allSortBtns = sortItems.querySelectorAll(".production__sort-btn");

allSortBtns.forEach((sortBtn) => {
  if (window.location.search.includes(sortBtn.dataset.sortName)) {
    sortBtn.classList.add("active");
  } else {
    sortBtn.classList.remove("active");
  }
});

sortItems.addEventListener("click", ({ target }) => {
  const sortBtn = target.closest(".production__sort-btn");

  if (sortBtn) {
    const queryParamsArr = window.location.search.split("&");

    const queryStrWithoutSorting = queryParamsArr
      .filter((item) => !item.includes(SORT_QUERY_ACTION_NAME))
      .join("&");

    window.location = `${queryStrWithoutSorting}${
      window.location.search.includes("?prioritet") ||
      !window.location.search.includes("?")
        ? "?"
        : "&"
    }${SORT_QUERY_ACTION_NAME}=${sortBtn.dataset.sortName}`;
  }
});
