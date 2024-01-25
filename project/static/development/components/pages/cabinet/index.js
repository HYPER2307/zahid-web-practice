import "./index.scss";
import { validationBtn } from "../../module/validation";
import { setAvatarColor, getUserInitials } from "../../module/avatar";

const profile = document.querySelector('.cabinet__profile')
const avatar = profile.querySelector('.avatar');
const editButton = profile.querySelector('.cabinet__profile-edit-btn');
const prifileParams = profile.querySelector('.cabinet__profile-params');
const profileForm = profile.querySelector('.cabinet__profile-form');

const firstName = avatar.dataset.first_name;
const lastName = avatar.dataset.last_name;

validationBtn(".profile-form");
setAvatarColor(profile);

avatar.classList.add('active');
avatar.innerText = getUserInitials(firstName, lastName);

const toggleProfileEdit = () => {
  prifileParams.classList.toggle('disable');
  profileForm.classList.toggle('active');
  
  if (editButton.dataset.text === 'edit') {
    editButton.dataset.text = 'cancel';
    editButton.innerText = 'Скасувати';
  } else {
    editButton.dataset.text = 'edit';
    editButton.innerText = 'Редагувати';
  }
};

editButton.addEventListener('click', () => {
  toggleProfileEdit();
});
