document.addEventListener('DOMContentLoaded', () => {

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox .close');

  if (lightbox && lightboxImg) {

    document.querySelectorAll('.school-gallery .gallery-item img').forEach(img => {
      img.addEventListener('click', () => {
        lightbox.style.display = 'block';
        lightboxImg.src = img.src;
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
      });
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        lightbox.style.display = 'none';
      }
    });

  }

  document.querySelectorAll(".readMore").forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();

      const content = button.previousElementSibling;

      if (!content || !content.classList.contains("toggle-content")) {
        return;
      }

      content.classList.toggle("show-more");

      if (content.classList.contains("show-more")) {
        button.textContent = "Read Less";
      } else {
        button.textContent = "Read More";
      }
    });
  });

});
