// Set the form-load timestamp in the hidden field.
const timestampField = document.querySelector("#timestamp");
if (timestampField) {
  timestampField.value = new Date().toISOString();
}

// Open the membership benefit dialog selected by the user.
document.querySelectorAll(".modal-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const modal = document.getElementById(link.dataset.modal);
    if (modal && typeof modal.showModal === "function") {
      modal.showModal();
    }
  });
});

// Close dialogs with their close buttons. The native dialog also supports Escape.
document.querySelectorAll(".benefit-modal").forEach((modal) => {
  const closeButton = modal.querySelector(".modal-close");
  if (closeButton) {
    closeButton.addEventListener("click", () => modal.close());
  }

  // Clicking the shaded backdrop closes the dialog.
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });
});
