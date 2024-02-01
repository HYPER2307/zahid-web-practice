import "./index.scss";

const COLORS = [
  "#09B14C",
  "#F3AF01",
  "#1789FC",
  "#613DC1",
  "#F14133",
  "#172B4D",
  "#5E6C84",
];

const getRandomFromSelectValues = (arr = COLORS) => {
  const num = Math.ceil(Math.random() * arr.length - 1);

  return arr[num];
};

export const setAvatarColor = (element = document.body) => {
  const avatar = element.querySelector(".avatar");
  const randomColor = getRandomFromSelectValues();

  avatar.style.backgroundColor = randomColor;
};

export const getUserInitials = (firsName, lastName, defaultSymbol = "U") => {
  const userNameInitials = (firsName?.[0] || "") + (lastName?.[0] || "");

  return userNameInitials || defaultSymbol;
};
