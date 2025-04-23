/** @constant {HTMLButtonElement} */
const openFormBtn = document.querySelector('#openFormBtn');

/** @constant {HTMLSpanElement} */
const closeFormBtn = document.querySelector('#closeFormBtn');

/** @constant {HTMLElement} */
const formModal = document.querySelector('#movieFormModal');

/**
 * Displays the movie form modal and disables background scrolling.
 *
 * @function openModal
 * @returns {void}
 */
const openModal = () => {
  formModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

/**
 * Hides the movie form modal and re-enables background scrolling.
 *
 * @function closeModal
 * @returns {void}
 */
const closeModal = () => {
  formModal.classList.add('hidden');
  document.body.style.overflow = 'auto';
};

// -------------------- Event Listeners --------------------

/**
 * Shows the modal when "Add Movie" button is clicked.
 */
openFormBtn.addEventListener('click', openModal);

/**
 * Hides the modal when the close (×) button is clicked.
 */
closeFormBtn.addEventListener('click', closeModal);

/**
 * Closes the modal when the user clicks the overlay background.
 *
 * @param {MouseEvent} e - The click event on the modal overlay.
 */
formModal.addEventListener('click', e => {
  if (e.target === formModal) {
    closeModal();
  }
});

/**
 * Closes the modal when the Escape key is pressed.
 *
 * @param {KeyboardEvent} e - The keyboard event from pressing a key.
 */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
  }
});
