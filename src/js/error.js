export function error(popup, item, err) {
  popup.addEventListener('input', function () {
    if (item.value.length === 0) {
      err.textContent = 'Это обязательное поле',
      err.style.visibility = 'visible';
    } else if (item.value.length < 2 || item.value.length > 30) {
      err.textContent = 'Должно быть от 2 до 30 символов',
      err.style.visibility = 'visible';
    } else {
      err.style.visibility = 'hidden';
    }
  });
}

export const errorAlert = document.querySelector('.error-alert');
export const errorMsg = document.querySelector('.error-msg');
export const errorAlertEdit = document.querySelector('.error-alert-edit');
export const errorMsgEdit = document.querySelector('.error-msg-edit');