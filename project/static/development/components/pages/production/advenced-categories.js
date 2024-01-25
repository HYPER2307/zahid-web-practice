const SHOWN_ITEMS_COUNT = 6;

const advencedCategoriesBlock = document.querySelector(
  ".advenced-categories__items-block"
);
const showMoreButton = document.querySelector(
  ".advenced-categories__show-more-btn"
);

const advencedCategoriesCount = document.querySelectorAll(
  ".advenced-categories__item"
)?.length;

if (advencedCategoriesCount <= SHOWN_ITEMS_COUNT) {
  showMoreButton.classList.add("disabled");
} else if (showMoreButton && advencedCategoriesBlock) {
  showMoreButton.addEventListener("click", () => {
    advencedCategoriesBlock.classList.toggle("is-shown-more");

    if (advencedCategoriesBlock.classList.contains("is-shown-more")) {
      showMoreButton.innerText = "Сховати";
    } else {
      showMoreButton.innerText = "Показати усі категорії";
      window.scrollTo(0, 0);
    }
  });
}
