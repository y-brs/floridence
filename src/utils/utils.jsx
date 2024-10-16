export const showHide = showModal => {
  const close = e => {
    if (e.keyCode === 27) {
      closeModal();
    }
  };
  if (showModal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
  window.addEventListener('keydown', close);

  return window.removeEventListener('keydown', close);
};
